import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {serialize} from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import {visit} from 'unist-util-visit';
import GithubSlugger from 'github-slugger';

// Root directory for MDX files
const DOCS_DIRECTORY = path.join(process.cwd(), 'docs');

// Get all MDX file paths
export function getAllMdxPaths() {
	return getMdxPaths(DOCS_DIRECTORY);
}

// Get all versioned MDX file paths
export function getVersionedMdxPaths(version: string) {
	const versionedDir = path.join(DOCS_DIRECTORY, 'versioned', version);
	return fs.existsSync(versionedDir) ? getMdxPaths(versionedDir) : [];
}

// Recursively get all MDX files from a directory
function getMdxPaths(dir: string): string[] {
	const files = fs.readdirSync(dir);

	return files.reduce((allFiles: string[], file) => {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory()) {
			return [...allFiles, ...getMdxPaths(filePath)];
		} else if (file.endsWith('.mdx')) {
			return [...allFiles, filePath];
		}

		return allFiles;
	}, []);
}

// Get slug from file path
export function getSlugFromPath(filePath: string): string[] {
	const relativePath = path.relative(DOCS_DIRECTORY, filePath);
	const slug = relativePath
		.replace(/\.mdx$/, '')
		.split(path.sep)
		.filter(Boolean);

	return slug;
}

// Get versioned slug from file path
export function getVersionedSlugFromPath(
	filePath: string,
	version: string
): string[] {
	const versionedDir = path.join(DOCS_DIRECTORY, 'versioned', version);
	const relativePath = path.relative(versionedDir, filePath);
	const slug = relativePath
		.replace(/\.mdx$/, '')
		.split(path.sep)
		.filter(Boolean);

	return slug;
}

// Extract headings from MDX content
export function extractHeadings(content: string) {
	const regXHeader = /^ *(?<flag>#{1,6})\s+(?<content>.+)/gm;
	const regXCodeBlock = /[\s\S]*?/g;
	const slugger = new GithubSlugger();

	// Ignore content within code blocks – No headings there
	const contentWithoutCodeBlocks = content.replace(regXCodeBlock, '');

	const headings = Array.from(
		contentWithoutCodeBlocks.matchAll(regXHeader)
	).map(({groups}) => {
		const flag = groups?.flag;
		// Handles headings with links eg:
		// Converts '##[Getting started](/getting-started)' to 'Getting started'
		const match = groups?.content?.match(/\[([^\]]+)\]\([^)]+\)/);
		const title = match ? match[1] : groups?.content;
		return {
			level: flag?.length,
			title: title,
			id: title ? slugger.slug(title) : undefined
		};
	});

	return headings;
}

// Get MDX file content
export async function getMdxContent(filePath: string) {
	const source = fs.readFileSync(filePath, 'utf8');
	const {content, data} = matter(source);
	const headings = extractHeadings(content);

	const prettyCodeOptions = {
		keepBackground: true,
		theme: JSON.parse(
			fs.readFileSync(
				path.join(process.cwd(), 'src/styles/shades-of-purple.json'),
				'utf-8'
			)
		)
	};

	const rehypePlugins = [
		// Extract raw code content from code elements within pre elements
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
		// Add raw code content as a property to pre elements within div elements containing data-rehype-pretty-code-fragment attribute
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

	const mdxSource = await serialize(content, {
		mdxOptions: {
			// @ts-ignore
			remarkPlugins: [remarkGfm],
      // @ts-ignore
			rehypePlugins: rehypePlugins,
			format: 'mdx'
		},
		scope: data
	});

	return {
		source: mdxSource,
		frontmatter: data,
		headings,
		filePath
	};
}

// Get all MDX files with their content
export async function getAllMdxFiles() {
	const paths = getAllMdxPaths();
	const files = await Promise.all(
		paths.map(async filePath => {
			const slug = getSlugFromPath(filePath);
			const content = await getMdxContent(filePath);

			return {
				slug,
				...content
			};
		})
	);

	return files;
}

// Get all versioned MDX files with their content
export async function getAllVersionedMdxFiles(version: string) {
	const paths = getVersionedMdxPaths(version);
	const files = await Promise.all(
		paths.map(async filePath => {
			const slug = getVersionedSlugFromPath(filePath, version);
			const content = await getMdxContent(filePath);

			return {
				slug,
				version,
				...content
			};
		})
	);

	return files;
}

// Get MDX file by slug
export async function getMdxFileBySlug(slug: string[]) {
	const filePath = path.join(DOCS_DIRECTORY, ...slug) + '.mdx';

	// Log the file path for debugging
	console.log('\n\nAttempting to load MDX file:', filePath);

	// Check if file exists
	if (!fs.existsSync(filePath)) {
		console.log('File not found, trying index.mdx');
		
		// Try with index.mdx if the direct path doesn't exist
		const indexPath = path.join(DOCS_DIRECTORY, ...slug, 'index.mdx');
		if (fs.existsSync(indexPath)) {
			const content = await getMdxContent(indexPath);
			return {
				slug,
				...content
			};
		}
		
		return null;
	}

	const content = await getMdxContent(filePath);

	return {
		slug,
		...content
	};
}

// Get versioned MDX file by slug
export async function getVersionedMdxFileBySlug(
	version: string,
	slug: string[]
) {
	const filePath =
		path.join(DOCS_DIRECTORY, 'versioned', version, ...slug) + '.mdx';

	if (!fs.existsSync(filePath)) {
		return null;
	}

	const content = await getMdxContent(filePath);

	return {
		slug,
		version,
		...content
	};
}
