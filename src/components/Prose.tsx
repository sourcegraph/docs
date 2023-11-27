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
				'dark:text-slate-400 prose prose-slate max-w-none dark:prose-invert',
				// headings
				'prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]',
				// For headings anchor
				'prose-headings:relative prose-headings:flex prose-headings:items-center',
				// lead
				'prose-lead:text-slate-500 dark:prose-lead:text-slate-400',
				// links
				'dark:prose-a:text-link prose-a:font-semibold',
				// link underline
				'prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.link-underline-light))] hover:prose-a:[--tw-prose-underline-size:6px] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.link-underline))] dark:hover:prose-a:[--tw-prose-underline-size:6px]',
				// pre
				'prose-pre:bg-slate-900 dark:prose-pre:bg-slate-800/60 dark:prose-pre:ring-slate-300/10 prose-pre:rounded-xl prose-pre:shadow-lg dark:prose-pre:shadow-none dark:prose-pre:ring-1',
				// hr
				'dark:prose-hr:border-slate-800',
				//table head alignment
				'prose-th:table-cell',
				// Strong
				'dark:prose-strong:text-slate-200 prose-strong:text-dark-bg',
				// Inline code block
				'prose-code:before:content-none prose-code:after:content-none'
			)}
			{...props}
		/>
	);
}
