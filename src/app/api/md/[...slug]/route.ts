import {allPosts} from 'contentlayer/generated';
import {NextResponse} from 'next/server';

// Prerender every post's markdown at build time; unknown slugs 404 without
// invoking a function.
export const dynamicParams = false;

export function generateStaticParams() {
	// The root index.mdx has an empty path; a catch-all needs at least one segment.
	return allPosts
		.filter(post => post._raw.flattenedPath !== '')
		.map(post => ({slug: post._raw.flattenedPath.split('/')}));
}

export async function GET(
	_: Request,
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
