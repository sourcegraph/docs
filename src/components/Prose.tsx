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
				'prose prose-slate max-w-none dark:prose-invert dark:text-slate-400',
				// headings
				'prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]',
				// For headings anchor
				'prose-headings:relative prose-headings:flex prose-headings:items-center',
				// lead
				'prose-lead:text-slate-500 dark:prose-lead:text-slate-400',
				// links
				'prose-a:font-semibold dark:prose-a:text-link',
				// link underline
				'prose-a:underline prose-a:decoration-link-light hover:prose-a:text-link-light hover:prose-a:underline dark:prose-a:no-underline dark:hover:prose-a:underline',
				// pre
				'prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10',
				// hr
				'dark:prose-hr:border-slate-800',
				//table head alignment
				'prose-th:table-cell',
				// Strong
				'prose-strong:text-dark-bg dark:prose-strong:text-slate-200',
				// Inline code block
				'prose-code:before:content-none prose-code:after:content-none',
				// Video
				'prose-video:rounded-xl'
			)}
			{...props}
		/>
	);
}
