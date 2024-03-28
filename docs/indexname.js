const fs = require('fs').promises;
const path = require('path');

// Function to recursively process folders
async function processFolder(folderPath) {
	try {
		const items = await fs.readdir(folderPath);

		for (const item of items) {
			const itemPath = path.join(folderPath, item);
			const stat = await fs.stat(itemPath);

			if (stat.isDirectory()) {
				// Recursively process subfolders
				await processFolder(itemPath);
			} else {
				const fileName = path.basename(item);
				if (fileName === 'index.mdx') {
					const folderName = path.basename(folderPath);
					const newFilePath = path.join(folderPath, '..', `${folderName}.mdx`);

					// Rename and move the file
					await fs.rename(itemPath, newFilePath);
					console.log(`Moving ${itemPath} to ${newFilePath}`);
				}
			}
		}
	} catch (error) {
		console.error(`Error processing folder ${folderPath}: ${error.message}`);
	}
}

// Start processing from the root folder
const rootFolder = './';
processFolder(rootFolder);
