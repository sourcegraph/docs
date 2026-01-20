import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';
import docsConfig from '../docs.config.js';

import {TECHNICAL_CHANGELOG_RSS_URL} from './data/constants';

const {updatedRedirectsData} = require('./data/redirects.ts');

function createRedirectUrl(
	request: NextRequest,
	destination: string,
	path: string
): string {
	// Handle absolute URLs
	if (destination.startsWith('http')) {
		// Extract version and full path after version
		const versionMatch = path.match(/(?:\/v\/|@)(\d+\.\d+)\/(.*)/);

		if (versionMatch) {
			const version = versionMatch[1];
			const remainingPath = versionMatch[2];

			// Find matching redirect for the remaining path
			const redirect = updatedRedirectsData.find(
				(r: any) =>
					r.source === `/${remainingPath}` ||
					r.source === remainingPath
			);

			// If redirect exists, use its destination, otherwise use the remaining path
			const finalPath = redirect
				? redirect.destination.replace(/^\//, '')
				: remainingPath;

			// Replace placeholders and construct final URL
			return destination
				.replace(':version', version)
				.replace(':slug*', finalPath);
		}

		// Handle other cases as before
		if (destination.includes(':slug')) {
			const slugMatch = path.match(/[^/]+$/);
			const slug = slugMatch ? slugMatch[0] : '';
			destination = destination.replace(':slug*', slug);
		}

		return destination;
	}

	// Handle relative paths
	const basePath = '/docs';
	return destination.startsWith('/')
		? `${request.nextUrl.origin}${basePath}${destination}`
		: `${request.nextUrl.origin}${basePath}/${destination}`;
}

export function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;
	const pathWithoutBase = path.replace('/docs', '');

	// Handle .md suffix - return raw markdown
	if (pathWithoutBase.endsWith('.md')) {
		const docPath = pathWithoutBase.replace(/\.md$/, '');
		const url = request.nextUrl.clone();
		url.pathname = `/api/md${docPath}`;
		return NextResponse.rewrite(url);
	}

	// Handle base redirects from redirects.ts
	const redirect = updatedRedirectsData.find(
		(r: any) => r.source === pathWithoutBase
	);
	if (redirect) {
		return NextResponse.redirect(
			createRedirectUrl(request, redirect.destination, path)
		);
	}

	// Handle latest version without path - redirect to main docs
	const latestVersionOnlyMatch = pathWithoutBase.match(
		`^\/(?:v\/|@)${docsConfig.DOCS_LATEST_VERSION}\/?$`
	);
	if (latestVersionOnlyMatch) {
		return NextResponse.redirect(`https://sourcegraph.com/docs`);
	}

	// Handle version without slug - both /v/X.Y and @X.Y formats (for non-latest versions)
	const versionOnlyMatch = pathWithoutBase.match(
		/^\/(?:v\/|@)(\d+\.\d+)\/?$/
	);
	if (
		versionOnlyMatch &&
		versionOnlyMatch[1] !== docsConfig.DOCS_LATEST_VERSION
	) {
		return NextResponse.redirect(
			`https://${versionOnlyMatch[1]}.sourcegraph.com/`
		);
	}

	// Handle version-specific redirects
	if (pathWithoutBase.startsWith(`/v/${docsConfig.DOCS_LATEST_VERSION}/`)) {
		return NextResponse.redirect(
			createRedirectUrl(
				request,
				`https://sourcegraph.com/docs/:slug*`,
				pathWithoutBase
			)
		);
	}
	if (pathWithoutBase.startsWith(`/@${docsConfig.DOCS_LATEST_VERSION}/`)) {
		return NextResponse.redirect(
			createRedirectUrl(
				request,
				`https://sourcegraph.com/docs/:slug*`,
				pathWithoutBase
			)
		);
	}
	const versionMatch = pathWithoutBase.match(/^\/v\/(\d+\.\d+)\/(.*)/);
	if (versionMatch) {
		return NextResponse.redirect(
			createRedirectUrl(
				request,
				'https://:version.sourcegraph.com/:slug*',
				pathWithoutBase
			)
		);
	}
	const atVersionMatch = pathWithoutBase.match(/^\/@(\d+\.\d+)\/(.*)/);

	if (atVersionMatch) {
		return NextResponse.redirect(
			createRedirectUrl(
				request,
				'https://:version.sourcegraph.com/:slug*',
				pathWithoutBase
			)
		);
	}

	if (pathWithoutBase === '/changelog.rss')
		return NextResponse.redirect(TECHNICAL_CHANGELOG_RSS_URL);

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api/md|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
};
