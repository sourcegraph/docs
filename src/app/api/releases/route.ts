import {NextResponse} from 'next/server';

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
