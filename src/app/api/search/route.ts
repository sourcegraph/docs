import {NextResponse} from 'next/server';
import {generateSearchIndex} from '@/lib/search';
import fs from 'fs';
import path from 'path';

export async function GET() {
	try {
		const searchItems = await generateSearchIndex();

		// Write to a file for static usage
		const publicDir = path.join(process.cwd(), 'public');
		if (!fs.existsSync(publicDir)) {
			fs.mkdirSync(publicDir, { recursive: true });
		}

		fs.writeFileSync(
			path.join(publicDir, 'search.json'),
			JSON.stringify(searchItems)
		);

		return NextResponse.json(searchItems);
	} catch (error) {
		console.error('Error generating search index:', error);
		return NextResponse.json(
			{error: 'Failed to generate search index'},
			{status: 500}
		);
	}
}
