'use client';

import Link from 'next/link';
import React, {
	Children,
	isValidElement,
	cloneElement,
	ReactNode,
	ComponentPropsWithoutRef
} from 'react';

interface childProps {
	props: {
		children: any;
	};
}

function AnchorIcon(props: ComponentPropsWithoutRef<'svg'>) {
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

function sanitizeAnchors(children: any): any {
	return Children.map(children, (child: childProps) => {
		if (typeof child === 'string') return child;

		if (isValidElement(child)) {
			if (child.type === 'a')
				return sanitizeAnchors(child.props.children);

			return cloneElement(child, {
				...child.props,
				children: sanitizeAnchors(child.props.children)
			});
		}

		return child;
	});
}

function Anchor({id, children}: {id: string; children: ReactNode}) {
	const sanitizedChildren = sanitizeAnchors(children);
	return (
		<Link
			href={`#${id}`}
			className="text-inherit not-prose hover:text-inherit group"
		>
			<div className="absolute ml-[-28px] mt-1 hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100 md:block lg:z-50">
				<AnchorIcon className="h-5 w-5 stroke-black transition group-focus:stroke-link-light dark:stroke-slate-200 dark:group-focus:stroke-link" />
			</div>
			{sanitizedChildren}
		</Link>
	);
}

interface HeadingProps {
	level?: '2' | '3' | '4' | '5' | '6';
	id: string;
	props: any;
}

export function Heading({level = '2', id, props}: HeadingProps) {
	let Component = `h${level}` as 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	return (
		<Component {...props}>
			<Anchor id={id}>{props.children}</Anchor>
		</Component>
	);
}
