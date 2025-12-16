import Link from 'next/link';
import React from 'react';
import {BookOpenText} from 'lucide-react';
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger
} from '@/components/ui/hoverCard';

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
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				{...rest}
				className="text-vermilion-00 underline hover:text-[#606060] dark:text-vermilion-11 dark:hover:text-dark-text-secondary"
			>
				{children}
			</a>
		);
	}

	// Handling anchor links
	if (href.startsWith('#')) {
		return (
			<a
				href={href}
				{...rest}
				className="text-vermilion-00 underline hover:text-[#606060] dark:text-vermilion-11 dark:hover:text-dark-text-secondary"
			>
				{children}
			</a>
		);
	}

	const highlightCode = (text: string) => {
		return text.split(/(`.+?`)/g).map((part: string, index: number) =>
			part.startsWith('`') && part.endsWith('`') ? (
				<span
					key={index}
					className="mx-1 rounded-md border border-slate-300 bg-slate-100 py-0.5 pl-1 font-medium dark:border-slate-700 dark:bg-slate-900"
				>
					{part.slice(1, -1)}
				</span>
			) : (
				part
			)
		);
	};

	// If there's a title, wrap the content in a HoverCard for tooltip
	if (rest?.title) {
		return (
			<HoverCard>
				<HoverCardTrigger asChild>
					<Link
						href={cleanedHref.replaceAll("'", '')}
						{...rest}
						title=""
						className="inline text-vermilion-00 underline hover:text-[#606060] dark:text-vermilion-11 dark:hover:text-dark-text-secondary"
					>
						{children}{' '}
						<BookOpenText className="ml-1 inline h-3 w-3 text-current" />
					</Link>
				</HoverCardTrigger>
				<HoverCardContent className="bg-vermilion-11 dark:bg-vermilion-00">
					<div className="mb-1 mt-0 font-medium leading-6">
						{children}
					</div>
					<div className="text-sm leading-6 text-vermilion-08">
						{highlightCode(rest.title || '')}
					</div>
				</HoverCardContent>
			</HoverCard>
		);
	}

	// Internal links handled by Next.js Link component
	return (
		<Link
			href={cleanedHref}
			{...rest}
			className="text-vermilion-00 underline hover:text-[#606060] dark:text-vermilion-11 dark:hover:text-dark-text-secondary"
		>
			{children}
			{/* Ensuring <a> is used inside <Link> for custom attributes like 'className' */}
		</Link>
	);
};
