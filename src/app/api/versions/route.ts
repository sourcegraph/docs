import {versions} from '@/data/versions';
import {NextResponse} from 'next/server';

export function GET() {
	return NextResponse.json(
		versions.map((version, index) =>
			index === 0
				? {...version, url: 'https://sourcegraph.com/docs'}
				: version
		),
		{
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Cache-Control':
					'public, max-age=0, s-maxage=300, stale-while-revalidate=60'
			}
		}
	);
}
