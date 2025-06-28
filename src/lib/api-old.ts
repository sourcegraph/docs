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

const FILE_CACHE_PATH = '/public/data/fileCache.json';
const CONTENT_PARENT_DIRECTORY = './docs/';

// Cache the file cache in memory to avoid repeated file reads
let fileCacheMemory: FileCache | null = null;

export const getFileCache = async (): Promise<FileCache | undefined> => {
	if (fileCacheMemory) {
		return fileCacheMemory;
	}

	try {
		const fileData = await fs.readFile(
			path.join(process.cwd(), FILE_CACHE_PATH),
			'utf8'
		);
		fileCacheMemory = JSON.parse(fileData) as FileCache;
		return fileCacheMemory;
	} catch (error) {
		console.error('Error reading file cache:', error);
		return undefined;
	}
};

const loadMarkdownFile = async (filename: string) => {
	try {
		const content = await fs.readFile(filename, 'utf8');
		const {data, content: markdownContent} = matter(content);
		return {frontmatter: data, content: markdownContent};
	} catch (error) {
		throw new Error(`Failed to load markdown file: ${filename}`);
	}
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

// Simplified MDX serialization
const serializeMdxSource = async (markdownContent: string) => {
	const prettyCodeOptions = {
		keepBackground: true,
		theme: 'github-light',
		defaultLang: 'plaintext'
	};

	// Simplified rehype plugins without the custom visit transformations
	const rehypePlugins = [
		[rehypePrettyCode, prettyCodeOptions],
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'wrap',
				properties: {
					className: ['anchor']
				}
			}
		]
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
