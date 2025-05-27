import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import {serialize} from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import {visit} from 'unist-util-visit';
import GithubSlugger from 'github-slugger';

interface FileRecord {
	filePath: string;
	slugPath: string;
	lastModified: number;
	frontmatter: Record<string, any>;
}

interface FileCache {
	lastGenerated: number;
	records: Record<string, FileRecord>;
}

interface SlugCache {
	lastGenerated: number;
	slugs: string[];
}

const FILE_CACHE_PATH = '/public/data/fileCache.json';
const SLUG_CACHE_PATH = '/public/data/slugCache.json';
const CONTENT_PARENT_DIRECTORY = './docs/';

export const getFileCache = async (): Promise<FileCache | undefined> => {
	try {
		const fileData = await fs.readFile(
			path.join(process.cwd(), FILE_CACHE_PATH),
			'utf8'
		);
		return JSON.parse(fileData) as FileCache;
	} catch (error) {
		console.error('Error reading file cache:', error);
		return undefined;
	}
};

export const getSlugCache = async (): Promise<SlugCache | undefined> => {
	try {
		const slugData = await fs.readFile(
			path.join(process.cwd(), SLUG_CACHE_PATH),
			'utf8'
		);
		return JSON.parse(slugData) as SlugCache;
	} catch (error) {
		console.error('Error reading slug cache:', error);
		return undefined;
	}
};

const loadMarkdownFile = async (filename: string) => {
	const page = await fs
		.readFile(filename, 'utf8')
		.then(page => {
			const {data, content} = matter(page);
			return {frontmatter: data, content};
		})
		.catch(error => {
			throw new Error(error);
		});
	return page;
};

const extractHeadings = (content: string) => {
	const regXHeader = /^ *(?<flag>#{1,6})\s+(?<content>.+)/gm;
	const regXCodeBlock = /[\s\S]*?/g;
	const slugger = new GithubSlugger();

	const contentWithoutCodeBlocks = content.replace(regXCodeBlock, '');

	const headings = Array.from(
		contentWithoutCodeBlocks.matchAll(regXHeader)
	).map(({groups}) => {
		const flag = groups?.flag;
		const match = groups?.content?.match(/\[([^\]]+)\]\([^)]+\)/);
		const title = match ? match[1] : groups?.content;
		return {
			level: flag?.length,
			title: title,
			id: title ? slugger.slug(title) : undefined
		};
	});
	return headings;
};

const serializeMdxSource = async (markdownContent: string) => {
	const prettyCodeOptions = {
		keepBackground: true,
		theme: JSON.parse(
			await fs.readFile(
				path.join(process.cwd(), 'src/styles/shades-of-purple.json'),
				'utf-8'
			)
		)
	};

	const rehypePlugins = [
		() => (tree: any) => {
			visit(tree, (node: any) => {
				if (node?.type === 'element' && node?.tagName === 'pre') {
					const [codeEl] = node.children;
					if (codeEl.tagName !== 'code') return;
					node.raw = codeEl.children?.[0].value;
				}
			});
		},
		[rehypePrettyCode, prettyCodeOptions],
		() => (tree: any) => {
			visit(tree, (node: any) => {
				if (node?.type === 'element' && node?.tagName === 'div') {
					if (
						!('data-rehype-pretty-code-fragment' in node.properties)
					)
						return;
					for (const child of node.children)
						if (child.tagName === 'pre')
							child.properties['raw'] = node.raw;
				}
			});
		},
		rehypeSlug,
		[rehypeAutolinkHeadings]
	];

	return await serialize(markdownContent, {
		mdxOptions: {
			remarkPlugins: [remarkGfm],
			// @ts-ignore
			rehypePlugins: rehypePlugins,
			format: 'mdx'
		}
	});
};

export interface MdxPost {
	frontmatter: any;
	content: string;
	headings: any[];
	slugPath: string;
	urlPath: string;
	source: any;
}

export const getAllPublishedPosts = async (): Promise<MdxPost[] | null> => {
	const fileCache = await getFileCache();
	if (!fileCache) {
		return null;
	}

	// Filter out versioned files and get only main docs
	const mainFiles = Object.values(fileCache.records).filter(
		record => !record.slugPath.startsWith('versioned/')
	);

	const posts = await Promise.all(
		mainFiles.map(async (record): Promise<MdxPost> => {
			const file = await loadMarkdownFile(
				path.resolve(CONTENT_PARENT_DIRECTORY, record.filePath)
			);
			const headings = extractHeadings(file.content);
			const source = await serializeMdxSource(file.content);

			return {
				frontmatter: file.frontmatter,
				content: file.content,
				headings,
				slugPath: record.slugPath,
				urlPath: `/${record.slugPath}`,
				source
			};
		})
	);

	return posts;
};

export const getAllVersionedPosts = async (
	version: string
): Promise<MdxPost[] | null> => {
	const fileCache = await getFileCache();
	if (!fileCache) {
		return null;
	}

	// Filter versioned files for the specific version
	const versionedFiles = Object.values(fileCache.records).filter(record =>
		record.slugPath.startsWith(`versioned/${version}/`)
	);

	const posts = await Promise.all(
		versionedFiles.map(async (record): Promise<MdxPost> => {
			const file = await loadMarkdownFile(
				path.resolve(CONTENT_PARENT_DIRECTORY, record.filePath)
			);
			const headings = extractHeadings(file.content);
			const source = await serializeMdxSource(file.content);

			// Remove the versioned prefix for the slug
			const cleanSlugPath = record.slugPath.replace(
				`versioned/${version}/`,
				''
			);

			return {
				frontmatter: file.frontmatter,
				content: file.content,
				headings,
				slugPath: cleanSlugPath,
				urlPath: `/v/${version}/${cleanSlugPath}`,
				source
			};
		})
	);

	return posts;
};

export const getPostBySlug = async (
	slugPath: string
): Promise<MdxPost | null> => {
	const fileCache = await getFileCache();
	if (!fileCache || !fileCache.records[slugPath]) {
		return null;
	}

	const record = fileCache.records[slugPath];
	const file = await loadMarkdownFile(
		path.resolve(CONTENT_PARENT_DIRECTORY, record.filePath)
	);
	const headings = extractHeadings(file.content);
	const source = await serializeMdxSource(file.content);

	return {
		frontmatter: file.frontmatter,
		content: file.content,
		headings,
		slugPath,
		urlPath: `/${slugPath}`,
		source
	};
};

export const getVersionedPostBySlug = async (
	version: string,
	slugPath: string
): Promise<MdxPost | null> => {
	const fileCache = await getFileCache();
	const versionedSlugPath = `versioned/${version}/${slugPath}`;

	if (!fileCache || !fileCache.records[versionedSlugPath]) {
		return null;
	}

	const record = fileCache.records[versionedSlugPath];
	const file = await loadMarkdownFile(
		path.resolve(CONTENT_PARENT_DIRECTORY, record.filePath)
	);
	const headings = extractHeadings(file.content);
	const source = await serializeMdxSource(file.content);

	return {
		frontmatter: file.frontmatter,
		content: file.content,
		headings,
		slugPath,
		urlPath: `/v/${version}/${slugPath}`,
		source
	};
};
