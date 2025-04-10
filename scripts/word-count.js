const path = require('path');
const fs = require('fs');
const {sync: glob} = require('glob');

// Configuration - Update this base URL as needed
const baseUrl = 'https://sourcegraph.com/';

// Find all .mdx files, ignoring node_modules
const mdxFiles = glob('**/*.mdx', {ignore: ['node_modules/**']});

// Array to store word counts
const wordCounts = [];
let totalWords = 0;

// Process each file
mdxFiles.forEach(filePath => {
	const fileName = path.basename(filePath);
	const content = fs.readFileSync(filePath, 'utf8');

	// Count words (split by whitespace)
	const words = content
		.trim()
		.split(/\s+/)
		.filter(word => word.length > 0);
	const wordCount = words.length;

	// Add to total and array
	totalWords += wordCount;
	wordCounts.push({
		fileName,
		filePath,
		wordCount
	});

	// Log word count for each file
	console.log(`${filePath}: ${wordCount} words`);
});

// Calculate average
const averageWordCount = totalWords / wordCounts.length;

// Calculate median (need to sort the array first)
const sortedCounts = [...wordCounts].sort((a, b) => a.wordCount - b.wordCount);
const middleIndex = Math.floor(sortedCounts.length / 2);
const medianWordCount =
	sortedCounts.length % 2 === 0
		? (sortedCounts[middleIndex - 1].wordCount +
				sortedCounts[middleIndex].wordCount) /
			2
		: sortedCounts[middleIndex].wordCount;

// Log summary statistics
console.log('\n--- Summary Statistics ---');
console.log(`Total files: ${wordCounts.length}`);
console.log(`Total words: ${totalWords}`);
console.log(`Average words per file: ${averageWordCount.toFixed(2)}`);
console.log(`Median words per file: ${medianWordCount}`);

// Find shortest and longest files
const shortestFile = sortedCounts[0];
const longestFile = sortedCounts[sortedCounts.length - 1];
console.log(
	`\nShortest file: ${shortestFile.filePath} (${shortestFile.wordCount} words)`
);
console.log(
	`Longest file: ${longestFile.filePath} (${longestFile.wordCount} words)`
);

// Optional: Write summary to a file
const summary = {
	totalFiles: wordCounts.length,
	totalWords,
	averageWordCount,
	medianWordCount,
	fileCounts: wordCounts
};

// fs.writeFileSync(
// 	'word-count-summary.json',
// 	JSON.stringify(summary, null, 2),
// 	'utf8'
// );
console.log('\nSummary written to word-count-summary.json');
