import Link from 'next/link';
import {CustomLink} from './CustomLink';

export function ProductCards({children}: {children: React.ReactNode}) {
	return (
		<div className="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
			{children}
		</div>
	);
}

export function ProductCard({
	title,
	description,
	href,
	imgSrc,
	imgAlt,
	version
}: {
	title: string;
	description: string;
	href: string;
	imgSrc: string;
	imgAlt: string;
	version?: string;
}) {
	return (
		<div className="group relative rounded-xl border border-light-border-2 dark:border-dark-border">
			<div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 transition-opacity [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.light-bg)),var(--quick-links-hover-bg,theme(colors.light-bg-1)))_padding-box,linear-gradient(144deg,#F34E3F,#A96AF3)_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.dark-bg)]" />
			<div className="relative flex flex-col items-start gap-y-4 overflow-hidden rounded-xl p-6">
				<img className="not-prose h-8 w-8" alt={imgAlt} src={imgSrc} />
				<div>
					<h2 className="font-display text-base text-slate-900 dark:text-white">
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
		</div>
	);
}
