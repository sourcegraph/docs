import Link from 'next/link';

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
	imgAlt
}: {
	title: string;
	description: string;
	href: string;
	imgSrc: string;
	imgAlt: string;
}) {
	return (
		<div className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
			<div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
			<div className="relative flex items-center gap-x-4 overflow-hidden rounded-xl p-6">
				<img className="not-prose h-8 w-8" alt={imgAlt} src={imgSrc} />
				<div>
					<h2 className="font-display text-base text-slate-900 dark:text-white">
						<Link href={href}>
							<span className="absolute -inset-px rounded-xl" />
							{title}
						</Link>
					</h2>

					<p className="mt-1 text-sm text-slate-700 dark:text-slate-400">
						{description}
					</p>
				</div>
			</div>
		</div>
	);
}
