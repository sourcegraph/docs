import Link from 'next/link';

import {Icon} from '@/components/Icon';

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
	icon
}: {
	title: string;
	description: string;
	href: string;
	icon: React.ComponentProps<typeof Icon>['icon'];
}) {
	return (
		<div className="border-slate-200 dark:border-slate-800 group relative rounded-xl border">
			<div className="border-transparent absolute -inset-px rounded-xl border-2 opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.link.light))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
			<div className="relative overflow-hidden rounded-xl p-6">
				<Icon icon={icon} className="h-8 w-8" />
				<h2 className="text-slate-900 dark:text-white mt-4 font-display text-base">
					<Link href={href}>
						<span className="absolute -inset-px rounded-xl" />
						{title}
					</Link>
				</h2>
				<p className="text-slate-700 dark:text-slate-400 mt-1 text-sm">
					{description}
				</p>
			</div>
		</div>
	);
}
