import {readFile} from 'fs/promises';
import {join} from 'path';

import {allPosts} from 'contentlayer/generated';
import {ImageResponse} from 'next/og';

export const runtime = 'nodejs';

// Render every page's image at build time, like the pages themselves: no
// function runs, no cold start, and each deploy refreshes the CDN copy.
// Unknown paths 404 at the edge.
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
	return [
		// The root page's image; index.mdx's flattened path is '' and a
		// catch-all needs at least one segment. Both render the default title.
		{path: ['index']},
		...allPosts
			.filter(post => post._raw.flattenedPath !== '')
			.map(post => ({path: post._raw.flattenedPath.split('/')}))
	];
}

export async function GET(
	_request: Request,
	{params}: {params: Promise<{path: string[]}>}
) {
	const path = (await params).path.join('/');
	const post = allPosts.find(post => post._raw.flattenedPath === path);

	const headingTitle = post?.headings?.[0]?.title;
	const docTitle = post?.title;
	const title =
		docTitle && headingTitle
			? `${docTitle}: ${headingTitle}`
			: (headingTitle ?? docTitle ?? 'Sourcegraph Documentation');

	const [polySansFont, logoSvg] = await Promise.all([
		readFile(join(process.cwd(), 'src/fonts/PolySans-Neutral.woff')),
		readFile(join(process.cwd(), 'src/images/logo-theme-dark.svg'), 'utf-8')
	]);

	const logoDataUrl = `data:image/svg+xml,${encodeURIComponent(logoSvg)}`;

	const fontSize =
		title.length > 50 ? '56px' : title.length > 30 ? '72px' : '84px';

	return new ImageResponse(
		<div
			style={{
				background: '#060000',
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				padding: '60px 80px'
			}}
		>
			{/* Sourcegraph logo */}
			{/* eslint-disable-next-line @next/next/no-img-element -- Satori requires a native image, and alt text is not rendered. */}
			<img src={logoDataUrl} width={246} height={35} alt="" />

			{/* Title */}
			<div
				style={{
					display: 'flex',
					flex: 1,
					alignItems: 'center'
				}}
			>
				<h1
					style={{
						fontFamily: 'PolySans',
						fontSize: fontSize,
						color: '#FFFFFF',
						lineHeight: 1.1,
						margin: 0,
						maxWidth: '1000px',
						wordBreak: 'break-word'
					}}
				>
					{title}
				</h1>
			</div>

			{/* Footer - Docs badge */}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '12px'
				}}
			>
				<div
					style={{
						background: '#F34E3F',
						color: '#060000',
						padding: '8px 20px',
						borderRadius: '6px',
						fontFamily: 'PolySans',
						fontSize: '20px'
					}}
				>
					Documentation
				</div>
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: 'PolySans',
					data: polySansFont,
					style: 'normal',
					weight: 400
				}
			]
		}
	);
}
