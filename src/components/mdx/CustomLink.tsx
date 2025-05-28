import Link from 'next/link';
import React from 'react';

interface CustomLinkProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	version?: string;
}

export const CustomLink: React.FC<CustomLinkProps> = ({
	href,
	version,
	children,
	...rest
}) => {
	if (!href) return null; // Safeguard against undefined href

	// Cleaning and potentially versioning the href
	let cleanedHref = href.replace(/\.mdx?$/, '');
	if (cleanedHref.startsWith('/') && version) {
		cleanedHref = `/v/${version}${cleanedHref}`;
	}

	// Handling external links
	if (href.startsWith('http')) {
		return (
			<a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
				{children}
			</a>
		);
	}

	// Handling anchor links
	if (href.startsWith('#')) {
		return (
			<a href={href} {...rest}>
				{children}
			</a>
		);
	}

	// Internal links handled by Next.js Link component
	return (
		<Link href={cleanedHref} {...rest}>
			{children}
			{/* Ensuring <a> is used inside <Link> for custom attributes like 'className' */}
		</Link>
	);
};
