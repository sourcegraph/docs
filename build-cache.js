const fs = require('fs');
const path = require('path');

// Simple implementation without external dependencies
const CONTENT_PARENT_DIRECTORY = path.join(process.cwd(), 'docs');
const CACHE_DIR = path.join(process.cwd(), 'public', 'data');

function ensureCacheDir() {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, {recursive: true});
  }
}

function getAllMdxFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getAllMdxFiles(fullPath));
    } else if (item.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function getSlugFromPath(filePath, baseDirectory) {
  const relativePath = path.relative(baseDirectory, filePath);
  return relativePath
    .replace(/\.mdx$/, '')
    .replace(/\/index$/, '')
    .replace(/\\/g, '/');
}

function extractFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontmatterRegex);
  
  if (!match) return {};
  
  const frontmatterString = match[1];
  const frontmatter = {};
  
  // Simple YAML parsing for basic key-value pairs
  const lines = frontmatterString.split('\n');
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      const cleanValue = value.replace(/^["']|["']$/g, '');
      
      // Convert boolean strings
      if (cleanValue === 'true') frontmatter[key] = true;
      else if (cleanValue === 'false') frontmatter[key] = false;
      else frontmatter[key] = cleanValue;
    }
  }
  
  return frontmatter;
}

function loadFrontmatter(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return extractFrontmatter(content);
  } catch (error) {
    console.warn(`Failed to load frontmatter for ${filePath}:`, error.message);
    return {};
  }
}

function shouldIncludeFile(frontmatter) {
  if (process.env.NODE_ENV === 'production' && frontmatter.draft === true) {
    return false;
  }
  return true;
}

function generateFileCache() {
  console.log('Generating file cache...');

  const cache = {
    lastGenerated: Date.now(),
    records: {}
  };

  const baseDirectory = CONTENT_PARENT_DIRECTORY;
  const files = getAllMdxFiles(baseDirectory);

  console.log(`Found ${files.length} MDX files`);

  for (const fullPath of files) {
    const stat = fs.statSync(fullPath);
    const frontmatter = loadFrontmatter(fullPath);

    if (!shouldIncludeFile(frontmatter)) {
      console.log(`Skipping draft file: ${fullPath}`);
      continue;
    }

    const slugPath = getSlugFromPath(fullPath, baseDirectory);
    const relativePath = path.relative(baseDirectory, fullPath);

    cache.records[slugPath] = {
      filePath: relativePath,
      slugPath,
      lastModified: stat.mtimeMs,
      frontmatter
    };
  }

  console.log(`Generated cache with ${Object.keys(cache.records).length} records`);
  return cache;
}

function saveCache(filename, data) {
  const filePath = path.join(CACHE_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Saved cache to ${filePath}`);
}

function main() {
  try {
    console.log('Starting cache generation...');
    ensureCacheDir();

    const fileCache = generateFileCache();
    saveCache('fileCache.json', fileCache);

    console.log('Cache generation completed successfully!');
    console.log(`Total files cached: ${Object.keys(fileCache.records).length}`);
  } catch (error) {
    console.error('Error generating cache:', error);
    process.exit(1);
  }
}

main();
