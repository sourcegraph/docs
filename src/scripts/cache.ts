import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {globby} from 'globby';

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

const ensureCacheDir = () => {
	if (!fs.existsSync(CACHE_DIR)) {
		fs.mkdirSync(CACHE_DIR, {recursive: true});
	}
};

const getSlugFromPath = (filePath: string, baseDirectory: string): string => {
	const relativePath = path.relative(baseDirectory, filePath);
	return relativePath
		.replace(/\.mdx$/, '')
		.replace(/\/index$/, '')
		.replace(/\\/g, '/');
};

const loadFrontmatter = (filePath: string): Record<string, any> => {
	try {
		const content = fs.readFileSync(filePath, 'utf8');
		const {data} = matter(content);
		return data;
	} catch (error) {
		console.warn(`Failed to load frontmatter for ${filePath}:`, error);
		return {};
	}
};

const isProduction = process.env.NODE_ENV === 'production';

const shouldIncludeFile = (frontmatter: Record<string, any>): boolean => {
	if (isProduction && frontmatter.draft === true) {
		return false;
	}
	return true;
};

const generateFileCache = async (): Promise<FileCache> => {
	console.log('Generating file cache...');

	const cache: FileCache = {
		lastGenerated: Date.now(),
		records: {}
	};

	const baseDirectory = CONTENT_PARENT_DIRECTORY;
	const getFiles = await globby('**/*.mdx', {cwd: baseDirectory});

	console.log(`Found ${getFiles.length} MDX files`);

	for (const file of getFiles) {
		const fullPath = path.join(baseDirectory, file);
		const stat = fs.statSync(fullPath);
		const frontmatter = loadFrontmatter(fullPath);

		if (!shouldIncludeFile(frontmatter)) {
			console.log(`Skipping draft file: ${file}`);
			continue;
		}

		const slugPath = getSlugFromPath(fullPath, baseDirectory);

		cache.records[slugPath] = {
			filePath: file,
			slugPath,
			lastModified: stat.mtimeMs,
			frontmatter
		};
	}

	console.log(
		`Generated cache with ${Object.keys(cache.records).length} records`
	);
	return cache;
};

const saveCache = (filename: string, data: any) => {
	const filePath = path.join(CACHE_DIR, filename);
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
	console.log(`Saved cache to ${filePath}`);
};

const main = async () => {
	try {
		console.log('Starting cache generation...');
		ensureCacheDir();

		const fileCache = await generateFileCache();
		saveCache('fileCache.json', fileCache);

		console.log('Cache generation completed successfully!');
		console.log(
			`Total files cached: ${Object.keys(fileCache.records).length}`
		);
	} catch (error) {
		console.error('Error generating cache:', error);
		process.exit(1);
	}
};

main();
