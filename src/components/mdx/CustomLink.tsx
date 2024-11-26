import Link from 'next/link';
import React from 'react';
import { BookOpenText } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hoverCard";

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

	const highlightCode = (text: string) => {
    return text.split(/(`.+?`)/g).map((part: string, index: number) =>
      part.startsWith('`') && part.endsWith('`') ? (
        <span key={index} className='border font-medium bg-slate-100 dark:bg-slate-900 mx-1 pl-1 py-0.5 rounded-md border-slate-300 dark:border-slate-700'>
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
				<Link href={cleanedHref.replaceAll("'", '')} {...rest} title='' className='inline'>
          {children} <BookOpenText className='inline ml-1 text-current w-3 h-3' />
        </Link>
        </HoverCardTrigger>
        <HoverCardContent>
            <div className='mt-0 mb-1 text-black font-medium leading-6'>{children}</div>
            <div className='text-sm leading-6 '>{highlightCode(rest.title || '')}</div>
          </HoverCardContent>
      </HoverCard>
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
