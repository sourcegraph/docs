import {NextResponse} from 'next/server';

// Next 15+ no longer caches GET handlers by default; keep this one prerendered
// and revalidated every 5 minutes, as it was on Next 14.
export const dynamic = 'force-static';
export const revalidate = 300;

// This endpoint proxies the release registry to not require access to another domain
// when visiting sourcegraph.com/docs. This might help some customers with strict firewalls.
export async function GET() {
	const res = await fetch(
		'https://releaseregistry.sourcegraph.com/v1/releases/sourcegraph',
		{next: {revalidate: 300}}
	);

	if (!res.ok) {
		return NextResponse.json(
			{error: 'Failed to fetch releases'},
			{status: 500}
		);
	}

	const data = await res.json();
	return NextResponse.json(data);
}
