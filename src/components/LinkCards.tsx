import Link from 'next/link';
import {Icon} from '@/components/Icon';

interface LinkCardI {
	href: string;
	imgSrc: string;
	imgAlt: string;
	title: string;
	description: string;
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
	description
}: LinkCardI) {
	return (
		<div className="bg-transparent hover:bg-slate-900 group rounded-xl px-4 pb-4 transition-colors">
			<a className="w-full" target="_blank" href={href}>
				<div className="flex items-start gap-4">
					<img
						className="not-prose h-6 w-6"
						alt={imgAlt}
						src={imgSrc}
					/>
					<h3 className="group-hover:text-link inline-flex transition-colors">
						{title}
					</h3>
				</div>

				<p className="text-slate-500 dark:text-slate-400 my-0 font-normal">
					{description}
				</p>
			</a>
		</div>
	);
}
