import {readFile} from 'fs/promises';
import {join} from 'path';

import {allPosts} from 'contentlayer/generated';
import {ImageResponse} from 'next/og';

export const runtime = 'nodejs';

export async function GET(
	_request: Request,
	{params}: {params: {path: string[]}}
) {
	const path = params.path.join('/');
	const post = allPosts.find(post => post._raw.flattenedPath === path);

	const headingTitle = post?.headings?.[0]?.title;
	const docTitle = post?.title;
	const title =
		docTitle && headingTitle
			? `${docTitle}: ${headingTitle}`
			: (headingTitle ?? docTitle ?? 'Sourcegraph Documentation');

	const [polySansFont, logoSvg] = await Promise.all([
		readFile(join(process.cwd(), 'src/fonts/PolySans-Neutral.woff')),
		readFile(join(process.cwd(), 'public/logo-theme-dark.svg'), 'utf-8')
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
			<img src={logoDataUrl} width={246} height={35} />

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
