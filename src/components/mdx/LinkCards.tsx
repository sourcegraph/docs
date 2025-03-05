import Link from 'next/link';
import {Icon} from '@/components/Icon';
import {CustomLink} from './CustomLink';

interface LinkCardI {
	href: string;
	imgSrc: string;
	imgAlt: string;
	title: string;
	description: string;
	version?: string;
}

interface LinkCardsI {
	children: React.ReactNode;
}

export function LinkCards({children}: LinkCardsI) {
	return <div className="my-6 flex flex-col gap-2">{children}</div>;
}

export function LinkCard({
	href,
	imgSrc,
	imgAlt,
	title,
	description,
	version
}: LinkCardI) {
	return (
		<div className="not-prose group relative rounded-xl border border-light-border-2 dark:border-dark-border">
			<div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 transition-opacity [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.light-bg)),var(--quick-links-hover-bg,theme(colors.light-bg-1)))_padding-box,linear-gradient(144deg,#F34E3F,#A96AF3)_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.dark-bg)]" />
			<div className="relative flex items-center gap-4 overflow-hidden rounded-xl p-4 sm:gap-6">
				<img className="not-prose h-8 w-8" alt={imgAlt} src={imgSrc} />
				<div className="flex flex-col items-start gap-1">
					<h3 className="slate-900 font-display text-xl dark:text-white">
						{title}
					</h3>
					<p className="font-normal text-slate-700 dark:text-dark-paragraph-text">
						{description}
					</p>
					<CustomLink version={version} href={href}>
						<span className="absolute -inset-px rounded-xl" />
					</CustomLink>
				</div>
			</div>
		</div>
	);
}
