'use client';

import {updatedRedirectsData} from '@/data/redirects';
import {usePathname} from 'next/navigation';
import {useEffect} from 'react';

const basePath = process.env.NEXT_PUBLIC_DOCS_BASE_PATH || '';

function splitHash(url: string): {path: string; hash: string} {
	const i = url.indexOf('#');
	return i === -1
		? {path: url, hash: ''}
		: {path: url.slice(0, i), hash: url.slice(i)};
}

// Entries in src/data/redirects.ts whose source has a `#fragment`. The
// middleware can never match these, because browsers do not send the fragment
// to the server, so they are applied here instead.
const fragmentRedirects = updatedRedirectsData.filter(r =>
	r.source.includes('#')
);
const bySource = new Map<string, string>();
for (const r of fragmentRedirects) {
	// First entry wins, matching the middleware's Array.find semantics.
	if (!bySource.has(r.source)) bySource.set(r.source, r.destination);
}

/**
 * `pathname` excludes the basePath (as returned by usePathname());
 * `hash` includes the leading '#'.
 */
export function resolveFragmentRedirect(
	pathname: string,
	hash: string
): string | undefined {
	if (!hash) return undefined;
	const exact = bySource.get(pathname + hash);
	if (exact) return exact;
	// The middleware may already have redirected the path, and the browser
	// carries the (now stale) fragment over to the new page. Match an entry
	// that points at this page and whose source fragment is the one we have.
	const carried = fragmentRedirects.find(r => {
		const dest = splitHash(r.destination);
		return (
			dest.path === pathname &&
			splitHash(r.source).hash === hash &&
			dest.hash !== hash
		);
	});
	return carried?.destination;
}

/**
 * Applies heading redirects (`/page#old-heading`) from src/data/redirects.ts
 * in the browser, after the page loads and again whenever the fragment changes.
 */
export function FragmentRedirect() {
	const pathname = usePathname();

	useEffect(() => {
		const apply = () => {
			const destination = resolveFragmentRedirect(
				pathname,
				window.location.hash
			);
			if (!destination) return;

			if (destination.startsWith('http')) {
				window.location.replace(destination);
				return;
			}

			const dest = splitHash(destination);
			if (dest.path !== pathname) {
				window.location.replace(basePath + destination);
				return;
			}

			// Same page: fix the URL in place and scroll to the new heading.
			window.history.replaceState(null, '', basePath + destination);
			if (dest.hash) {
				document
					.getElementById(decodeURIComponent(dest.hash.slice(1)))
					?.scrollIntoView();
			}
		};

		apply();
		window.addEventListener('hashchange', apply);
		return () => window.removeEventListener('hashchange', apply);
	}, [pathname]);

	return null;
}
