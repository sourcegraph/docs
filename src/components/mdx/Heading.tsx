'use client';

import Link from 'next/link';

function AnchorIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
	return (
		<svg
			viewBox="0 0 20 20"
			fill="none"
			strokeLinecap="round"
			aria-hidden="true"
			{...props}
		>
			<path d="m6.5 11.5-.964-.964a3.535 3.535 0 1 1 5-5l.964.964m2 2 .964.964a3.536 3.536 0 0 1-5 5L8.5 13.5m0-5 3 3" />
		</svg>
	);
}

function Anchor({ id, children }: { id: string; children: React.ReactNode }) {
	return (
		<Link
			href={`#${id}`}
			className="text-inherit not-prose hover:text-inherit group"
		>
			<div className="absolute ml-[-28px] mt-1 hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100 md:block lg:z-50">
				<AnchorIcon className="h-5 w-5 stroke-black transition group-focus:stroke-link-light dark:stroke-slate-200 dark:group-focus:stroke-link" />
			</div>
			{children}
		</Link>
	);
}

interface HeadingProps {
	level?: '2' | '3';
	id: string;
	props: any;
}

export function Heading({ level = '2', id, props }: HeadingProps) {
	let Component = `h${level}` as 'h2' | 'h3';
	return (
		<Component {...props} style={{ overflow: "auto" }}>
			<Anchor id={id}>{props.children}</Anchor>
		</Component>
	);
}
