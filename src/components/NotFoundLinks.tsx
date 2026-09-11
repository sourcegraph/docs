'use client';

import {usePreviousPathname} from '@/components/PreviousPathname';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect, useMemo, useState} from 'react';

const linkClassName =
	'text-sm font-medium text-slate-900 hover:underline dark:text-white';

// Closest ancestor of `pathname` that is a real docs page, excluding the root
// (the home link always covers that).
function nearestExistingAncestor(
	pathname: string,
	pagePaths: Set<string>
): string | null {
	const segments = pathname.split('/').filter(Boolean);
	for (let depth = segments.length - 1; depth > 0; depth--) {
		const candidate = `/${segments.slice(0, depth).join('/')}`;
		if (pagePaths.has(candidate)) return candidate;
	}
	return null;
}

// Production serves the docs under /docs (basePath in next.config.js).
const basePath = process.env.NEXT_PUBLIC_DOCS_BASE_PATH || '';

interface PageLink {
	href: string;
	pathname: string;
}

// The docs page the user came from on a fresh page load. document.referrer
// keeps the basePath, which next/link adds again, so strip it here; pages on
// the same origin outside the docs (sourcegraph.com/pricing) do not count.
// document.referrer does not change on client-side navigations, so those are
// covered by usePreviousPathname instead.
function docsReferrer(): PageLink | null {
	if (!document.referrer) return null;
	const referrer = new URL(document.referrer);
	if (referrer.origin !== window.location.origin) return null;
	if (!referrer.pathname.startsWith(`${basePath}/`)) return null;
	const pathname = referrer.pathname.slice(basePath.length);
	// The home link already covers the root.
	if (pathname === '/') return null;
	return {href: pathname + referrer.search + referrer.hash, pathname};
}

export function NotFoundLinks({pagePaths}: {pagePaths: string[]}) {
	const pathname = usePathname();
	const previousPathname = usePreviousPathname();
	const [ancestor, setAncestor] = useState<string | null>(null);
	const [referrer, setReferrer] = useState<PageLink | null>(null);
	const pagePathSet = useMemo(() => new Set(pagePaths), [pagePaths]);

	// Both values depend on the browser URL, which the statically prerendered
	// 404 page does not know, so resolve them after mount to avoid a hydration
	// mismatch.
	useEffect(() => {
		setAncestor(nearestExistingAncestor(pathname, pagePathSet));
		setReferrer(docsReferrer());
	}, [pathname, pagePathSet]);

	// The previous pathname may itself have been a 404.
	const previousPage =
		previousPathname && pagePathSet.has(previousPathname)
			? previousPathname
			: null;

	// Prefer the in-app history over document.referrer, which goes stale on
	// client-side navigations.
	const backLink: PageLink | null = previousPage
		? {href: previousPage, pathname: previousPage}
		: referrer;

	// Skip the up link when it would repeat the back link.
	const upLink =
		ancestor && ancestor !== backLink?.pathname.replace(/\/$/, '')
			? ancestor
			: null;

	return (
		<div className="mt-8 flex flex-col gap-3">
			{backLink && (
				<Link href={backLink.href} className={linkClassName}>
					Go back to {backLink.pathname}
				</Link>
			)}
			{upLink && (
				<Link href={upLink} className={linkClassName}>
					Go up to {upLink}
				</Link>
			)}
			<Link href="/" className={linkClassName}>
				Go back home
			</Link>
		</div>
	);
}
