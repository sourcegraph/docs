const path = require('path');
const fs = require('fs');
const { sync: glob } = require('glob');

// Configuration - Update this base URL as needed
const baseUrl = 'https://sourcegraph.com/';

// Find all .mdx files, ignoring node_modules
const mdxFiles = glob('**/*.mdx', { ignore: ['node_modules/**'] });

let combinedContent = '';

mdxFiles.forEach(filePath => {
  const fileName = path.basename(filePath);
  const content = fs.readFileSync(filePath, 'utf8');

  // Remove .mdx extension and convert path to URL format
  const parsed = path.parse(filePath);
  const urlPath = path.join(parsed.dir, parsed.name)
    .replace(/\\/g, '/') // Convert Windows paths to Unix format
    .replace(/^\/?/, '/'); // Ensure consistent leading slash

  // Construct full URL and wrap content
  combinedContent += `<File name="${fileName}" path="${baseUrl}${urlPath}">\n${content}\n</File>\n\n`;
});

// Write the combined content to llm.txt
fs.writeFileSync('public/llms.txt', combinedContent, 'utf8');

console.log(`Combined ${mdxFiles.length} .mdx files into llms.txt`);
console.log(`To access after deployment, go to https://sourcegraph.com/docs/llms.txt`);
