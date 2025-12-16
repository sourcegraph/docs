import {allPosts} from 'contentlayer/generated';
import {NextRequest, NextResponse} from 'next/server';

export async function GET(
	_: NextRequest,
	{params}: {params: {slug: string[]}}
) {
	const docPath = params.slug.join('/');
	const post = allPosts.find(post => post._raw.flattenedPath === docPath);

	if (!post) {
		return new NextResponse('Not Found', {status: 404});
	}

	return new NextResponse(post.body.raw, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8'
		}
	});
}
