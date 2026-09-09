'use client';

import {usePreviousPathname} from '@/components/PreviousPathname';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';

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

// The page the user came from on a fresh page load, only when it is on this
// site. document.referrer does not change on client-side navigations, so
// those are covered by usePreviousPathname instead.
function sameOriginReferrer(): URL | null {
	if (!document.referrer) return null;
	const referrer = new URL(document.referrer);
	return referrer.origin === window.location.origin ? referrer : null;
}

export function NotFoundLinks({pagePaths}: {pagePaths: string[]}) {
	const pathname = usePathname();
	const previousPathname = usePreviousPathname();
	const [ancestor, setAncestor] = useState<string | null>(null);
	const [referrer, setReferrer] = useState<URL | null>(null);

	// Both values depend on the browser URL, which the statically prerendered
	// 404 page does not know, so resolve them after mount to avoid a hydration
	// mismatch.
	useEffect(() => {
		setAncestor(nearestExistingAncestor(pathname, new Set(pagePaths)));
		setReferrer(sameOriginReferrer());
	}, [pathname, pagePaths]);

	return (
		<div className="mt-8 flex flex-col gap-3">
			{previousPathname ? (
				<Link href={previousPathname} className={linkClassName}>
					Go back to {previousPathname}
				</Link>
			) : (
				referrer && (
					<a href={referrer.href} className={linkClassName}>
						Go back to {referrer.pathname}
					</a>
				)
			)}
			{ancestor && (
				<Link href={ancestor} className={linkClassName}>
					Go up to {ancestor}
				</Link>
			)}
			<Link href="/" className={linkClassName}>
				Go back home
			</Link>
		</div>
	);
}
