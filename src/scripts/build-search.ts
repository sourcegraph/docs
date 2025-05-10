import {generateSearchIndex} from '@/lib/search';
import fs from 'fs';
import path from 'path';

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
			JSON.stringify(searchItems)
		);

		console.log('Search index generated successfully!');
	} catch (error) {
		console.error('Error generating search index:', error);
		process.exit(1);
	}
}

buildSearch();
