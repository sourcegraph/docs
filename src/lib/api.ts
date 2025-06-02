import fs from 'fs/promises';
import defaultFs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {serialize} from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import GithubSlugger from 'github-slugger';

import shadesOfPurple from '../styles/shades-of-purple.json'

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

// In-memory cache to avoid multiple file reads
let fileCacheMemory: FileCache | null = null;
let serializedContentCache = new Map<string, any>();

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
	const regXCodeBlock = /```[\s\S]*?```/g;
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

// Optimized MDX serialization with caching
const serializeMdxSource = async (
	markdownContent: string,
	cacheKey: string
) => {
	// Check if we've already serialized this content
	if (serializedContentCache.has(cacheKey)) {
		return serializedContentCache.get(cacheKey);
	}

	const prettyCodeOptions = {
		keepBackground: true,
		theme: shadesOfPurple,
		defaultLang: 'plaintext'
	};

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

	const result = await serialize(markdownContent, {
		mdxOptions: {
			remarkPlugins: [remarkGfm],
			// @ts-ignore
			rehypePlugins: rehypePlugins,
			format: 'mdx'
		}
	});

	// Cache the result
	serializedContentCache.set(cacheKey, result);
	return result;
};

export interface MdxPost {
	frontmatter: any;
	content: string;
	headings: any[];
	slugPath: string;
	urlPath: string;
	source: any;
}

// Optimized function to get all published posts with parallel processing
export const getAllPublishedPosts = async (): Promise<MdxPost[] | null> => {
	const fileCache = await getFileCache();
	if (!fileCache) {
		return null;
	}

	const mainFiles = Object.values(fileCache.records).filter(
		record => !record.slugPath.startsWith('versioned/')
	);

	// Process files in parallel batches to avoid overwhelming the system
	const batchSize = 10;
	const posts: MdxPost[] = [];

	for (let i = 0; i < mainFiles.length; i += batchSize) {
		const batch = mainFiles.slice(i, i + batchSize);
		const batchResults = await Promise.all(
			batch.map(async (record): Promise<MdxPost> => {
				const file = await loadMarkdownFile(
					path.resolve(CONTENT_PARENT_DIRECTORY, record.filePath)
				);
				const headings = extractHeadings(file.content);
				const cacheKey = `main_${record.slugPath}_${record.lastModified}`;
				const source = await serializeMdxSource(file.content, cacheKey);

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
		posts.push(...batchResults);
	}

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

	if (versionedFiles.length === 0) {
		return [];
	}

	const batchSize = 10;
	const posts: MdxPost[] = [];

	for (let i = 0; i < versionedFiles.length; i += batchSize) {
		const batch = versionedFiles.slice(i, i + batchSize);
		const batchResults = await Promise.all(
			batch.map(async (record): Promise<MdxPost> => {
				const file = await loadMarkdownFile(
					path.resolve(CONTENT_PARENT_DIRECTORY, record.filePath)
				);
				const headings = extractHeadings(file.content);
				const cacheKey = `versioned_${version}_${record.slugPath}_${record.lastModified}`;
				const source = await serializeMdxSource(file.content, cacheKey);

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
		posts.push(...batchResults);
	}

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
	const cacheKey = `single_${slugPath}_${record.lastModified}`;
	const source = await serializeMdxSource(file.content, cacheKey);

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
	const cacheKey = `versioned_single_${version}_${slugPath}_${record.lastModified}`;
	const source = await serializeMdxSource(file.content, cacheKey);

	return {
		frontmatter: file.frontmatter,
		content: file.content,
		headings,
		slugPath,
		urlPath: `/v/${version}/${slugPath}`,
		source
	};
};

// Helper function to get all available slugs for static generation
export const getAllSlugs = async (): Promise<string[]> => {
	const fileCache = await getFileCache();
	if (!fileCache) {
		return [];
	}

	return Object.keys(fileCache.records).filter(
		slug => !slug.startsWith('versioned/')
	);
};

// Helper function to get all versioned slugs for static generation
export const getAllVersionedSlugs = async (
	version: string
): Promise<string[]> => {
	const fileCache = await getFileCache();
	if (!fileCache) {
		return [];
	}

	return Object.keys(fileCache.records)
		.filter(slug => slug.startsWith(`versioned/${version}/`))
		.map(slug => slug.replace(`versioned/${version}/`, ''));
};
