import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';
import docsConfig from '../docs.config.js';

import {TECHNICAL_CHANGELOG_RSS_URL} from './data/constants';
import {updatedRedirectsData} from './data/redirects';

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
	const base = `${request.nextUrl.origin}${docsConfig.DOCS_BASE_PATH}`;
	return destination.startsWith('/')
		? `${base}${destination}`
		: `${base}/${destination}`;
}

export function proxy(request: NextRequest) {
	// nextUrl.pathname excludes basePath, so /docs/x arrives here as /x.
	const path = request.nextUrl.pathname;

	// Handle .md suffix - return raw markdown
	if (path.endsWith('.md')) {
		const docPath = path.replace(/\.md$/, '');
		const url = request.nextUrl.clone();
		url.pathname = `/api/md${docPath}`;
		return NextResponse.rewrite(url);
	}

	// Handle base redirects from redirects.ts
	const redirect = updatedRedirectsData.find(
		(r: any) => r.source === path
	);
	if (redirect) {
		return NextResponse.redirect(
			createRedirectUrl(request, redirect.destination, path)
		);
	}

	// Handle latest version without path - redirect to main docs
	const latestVersionOnlyMatch = path.match(
		`^\/(?:v\/|@)${docsConfig.DOCS_LATEST_VERSION}\/?$`
	);
	if (latestVersionOnlyMatch) {
		return NextResponse.redirect(
			`${request.nextUrl.origin}${docsConfig.DOCS_BASE_PATH}`
		);
	}

	// Handle version without slug - both /v/X.Y and @X.Y formats (for non-latest versions)
	const versionOnlyMatch = path.match(
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

	// Latest version with a slug: this deployment serves it, so stay here.
	if (
		path.startsWith(`/v/${docsConfig.DOCS_LATEST_VERSION}/`) ||
		path.startsWith(`/@${docsConfig.DOCS_LATEST_VERSION}/`)
	) {
		return NextResponse.redirect(
			createRedirectUrl(
				request,
				`${request.nextUrl.origin}${docsConfig.DOCS_BASE_PATH}/:slug*`,
				path
			)
		);
	}
	const versionMatch = path.match(/^\/v\/(\d+\.\d+)\/(.*)/);
	if (versionMatch) {
		return NextResponse.redirect(
			createRedirectUrl(
				request,
				'https://:version.sourcegraph.com/:slug*',
				path
			)
		);
	}
	const atVersionMatch = path.match(/^\/@(\d+\.\d+)\/(.*)/);

	if (atVersionMatch) {
		return NextResponse.redirect(
			createRedirectUrl(
				request,
				'https://:version.sourcegraph.com/:slug*',
				path
			)
		);
	}

	if (path === '/changelog.rss')
		return NextResponse.redirect(TECHNICAL_CHANGELOG_RSS_URL);

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api/md|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
};
