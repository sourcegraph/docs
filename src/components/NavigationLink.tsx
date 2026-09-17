'use client';

import Link from 'next/link';
import {useState} from 'react';

type NavigationLinkProps = Omit<React.ComponentProps<typeof Link>, 'prefetch'>;

// The sidebar shows dozens of links at once, and Next's default prefetches
// the full static page for every link in the viewport: one page view fetched
// ~80 RSC payloads (2.4 MB decoded). Prefetch only once the user shows intent.
// https://nextjs.org/docs/app/guides/prefetching#hover-triggered-prefetch
export function NavigationLink(props: NavigationLinkProps) {
	const [hasIntent, setHasIntent] = useState(false);
	const markIntent = () => setHasIntent(true);

	// next/link treats an absolute URL on our own origin (sourcegraph.com/pricing)
	// as an app route and prefetches the marketing page's HTML. Plain anchors
	// for anything with a scheme.
	if (typeof props.href === 'string' && /^https?:\/\//.test(props.href)) {
		const {href, ...anchorProps} = props;
		return <a href={href} {...anchorProps} />;
	}

	return (
		<Link
			{...props}
			prefetch={hasIntent ? null : false}
			onMouseEnter={markIntent}
			onFocus={markIntent}
		/>
	);
}
