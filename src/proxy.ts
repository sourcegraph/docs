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
			// Pass the path through unchanged: each versioned site carries the
			// redirects that were current for its version, and applying this
			// branch's redirects.ts here sends old versions to pages that did not
			// exist yet.
			return destination
				.replace(':version', versionMatch[1])
				.replace(':slug*', versionMatch[2]);
		}

		// Handle other cases as before
		if (destination.includes(':slug')) {
			const slugMatch = path.match(/[^/]+$/);
			const slug = slugMatch ? slugMatch[0] : '';
			destination = destination.replace(':slug*', slug);
		}

		return destination;
	}

	// Handle relative paths. basePath is '/docs' on sourcegraph.com/docs and
	// '' on the X.Y.sourcegraph.com deployments (see next.config.js).
	const {origin, basePath} = request.nextUrl;
	return destination.startsWith('/')
		? `${origin}${basePath}${destination}`
		: `${origin}${basePath}/${destination}`;
}

export function proxy(request: NextRequest) {
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
