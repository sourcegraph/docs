import clsx from 'clsx';

export function Prose<T extends React.ElementType = 'div'>({
	as,
	className,
	...props
}: React.ComponentPropsWithoutRef<T> & {
	as?: T;
}) {
	let Component = as ?? 'div';

	return (
		<Component
			className={clsx(
				className,
				'prose prose-slate max-w-none dark:prose-invert dark:text-dark-paragraph-text',
				// headings
				'prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]',
				// For headings anchor
				'prose-headings:relative prose-headings:flex prose-headings:items-center',
				// lead
				'prose-lead:text-slate-500 dark:prose-lead:text-dark-paragraph-text',
				// links
				'hover:prose-a-text:[#606060] visited:text-[#4A4A4A] hover:visited:text-[#606060] prose-a:font-semibold prose-a:text-vermilion-00 dark:visited:text-[#606060] dark:hover:visited:text-[#A9A9A9] dark:prose-a:text-vermilion-11 dark:hover:prose-a:text-dark-text-secondary',
				// link underline
				'prose-a:underline hover:prose-a:text-[#606060] hover:prose-a:underline dark:prose-a:underline dark:hover:prose-a:underline',
				// pre
				'prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10',
				// hr
				'dark:prose-hr:border-slate-800',
				//table head alignment
				'prose-th:table-cell',
				// Strong
				'prose-strong:text-vermilion-08 dark:prose-strong:text-vermilion-08',
				// Inline code block
				'prose-code:before:content-none prose-code:after:content-none',
				// Video
				'prose-video:rounded-xl',

				// Specific styles for the API docs navigation
				// Remove bullets from all nav items
				'[&_#nav_ul]:ml-0 [&_#nav_ul]:list-none [&_#nav_ul]:pl-0',

				// Style all nav links
				'[&_#nav_a]:font-normal [&_#nav_a]:text-slate-500 hover:[&_#nav_a]:text-slate-700 dark:[&_#nav_a]:text-dark-text-secondary dark:hover:[&_#nav_a]:text-slate-300',
				'[&_#nav_a]:no-underline hover:[&_#nav_a]:underline dark:hover:[&_#nav_a]:underline',

				// Specific style for h5.nav-group-section-title links (to match TOC h3)
				'[&_#nav_h5.nav-group-section-title_a]:font-normal [&_#nav_h5.nav-group-section-title_a]:text-slate-500 hover:[&_#nav_h5.nav-group-section-title_a]:text-slate-700 dark:[&_#nav_h5.nav-group-section-title_a]:text-dark-text-secondary dark:hover:[&_#nav_h5.nav-group-section-title_a]:text-slate-300',
				'[&_#nav_h5.nav-group-section-title_a]:no-underline hover:[&_#nav_h5.nav-group-section-title_a]:underline dark:hover:[&_#nav_h5.nav-group-section-title_a]:underline'
			)}
			{...props}
		/>
	);
}
