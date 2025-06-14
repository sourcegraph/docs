import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_PARENT_DIRECTORY = path.join(process.cwd(), 'docs');
const CACHE_DIR = path.join(process.cwd(), 'public', 'data');

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

const loadCache = (): FileCache | null => {
	try {
		const cacheFile = path.join(CACHE_DIR, 'fileCache.json');
		if (!fs.existsSync(cacheFile)) {
			return null;
		}
		const content = fs.readFileSync(cacheFile, 'utf8');
		return JSON.parse(content);
	} catch (error) {
		console.warn('Failed to load cache:', error);
		return null;
	}
};

const extractHeadings = (content: string) => {
	const regXHeader = /^ *(?<flag>#{1,6})\s+(?<content>.+)/gm;
	const regXCodeBlock = /[\s\S]*?/g;

	// Ignore content within code blocks
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
			id: title
				? title
						.toLowerCase()
						.replace(/[^a-z0-9]+/g, '-')
						.replace(/(^-|-$)/g, '')
				: undefined
		};
	});

	return headings;
};

const generateSearchIndex = async () => {
	const cache = loadCache();
	if (!cache) {
		throw new Error('Cache not found. Run build:cache first.');
	}

	const searchItems = [];

	for (const [slugPath, record] of Object.entries(cache.records)) {
		try {
			const fullPath = path.join(
				CONTENT_PARENT_DIRECTORY,
				record.filePath
			);
			const content = fs.readFileSync(fullPath, 'utf8');
			const {content: mdxContent} = matter(content);
			const headings = extractHeadings(mdxContent);

			// Determine URL path
			let urlPath: string;
			if (slugPath.startsWith('versioned/')) {
				const parts = slugPath.split('/');
				const version = parts[1];
				const restPath = parts.slice(2).join('/');
				urlPath = `/v/${version}/${restPath}`;
			} else {
				urlPath = `/${slugPath}`;
			}

			searchItems.push({
				url: urlPath,
				title:
					headings[0]?.title ||
					record.frontmatter?.title ||
					'Untitled',
				date: record.frontmatter?.date,
				headings: headings,
				version: slugPath.startsWith('versioned/')
					? slugPath.split('/')[1]
					: undefined
			});
		} catch (error) {
			console.warn(`Failed to process ${record.filePath}:`, error);
		}
	}

	return searchItems;
};

async function buildSearch() {
	try {
		console.log('Generating search index...');
		const searchItems = await generateSearchIndex();

		// Ensure public directory exists
		const publicDir = path.join(process.cwd(), 'public');
		if (!fs.existsSync(publicDir)) {
			fs.mkdirSync(publicDir, {recursive: true});
		}

		fs.writeFileSync(
			path.join(publicDir, 'search.json'),
			JSON.stringify(searchItems, null, 2)
		);

		console.log(`Search index generated with ${searchItems.length} items!`);
	} catch (error) {
		console.error('Error generating search index:', error);
		process.exit(1);
	}
}

buildSearch();
