import Link from 'next/link';

import {Icon} from '@/components/Icon';
import {CustomLink} from './CustomLink';

export function QuickLinks({children}: {children: React.ReactNode}) {
	return (
		<div className="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
			{children}
		</div>
	);
}

export function QuickLink({
	title,
	description,
	href,
	icon,
	version
}: {
	title: string;
	description: string;
	href: string;
	icon: React.ComponentProps<typeof Icon>['icon'];
	version?: string;
}) {
	return (
		<div className="group relative rounded-xl border border-light-border-2 dark:border-dark-border">
			<div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 transition-opacity [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.light-bg)),var(--quick-links-hover-bg,theme(colors.light-bg-1)))_padding-box,linear-gradient(144deg,#F34E3F,#A96AF3)_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.dark-bg)]" />
			<div className="relative overflow-hidden rounded-xl p-6">
				<Icon icon={icon} className="h-8 w-8" />
				<h2 className="mt-4 font-display text-base text-slate-900 dark:text-white">
					<CustomLink version={version} href={href}>
						<span className="absolute -inset-px rounded-xl" />
						{title}
					</CustomLink>
				</h2>
				<p className="mt-1 text-sm text-slate-700 dark:text-dark-paragraph-text">
					{description}
				</p>
			</div>
		</div>
	);
}
