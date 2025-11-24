import {Button} from '@/components/Button';
import clsx from 'clsx';
import {HeroBackground} from './HeroBackground';
import {HeroGradient} from './HeroGradient';

function TrafficLightsIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
	return (
		<svg aria-hidden="true" viewBox="0 0 42 10" fill="none" {...props}>
			<circle cx="5" cy="5" r="4.5" />
			<circle cx="21" cy="5" r="4.5" />
			<circle cx="37" cy="5" r="4.5" />
		</svg>
	);
}

export function Hero() {
	return (
		<div className="overflow-hidden dark:-mb-32 dark:mt-[-4.75rem] dark:bg-dark-bg dark:pb-32 dark:pt-[4.75rem]">
			<div className="py-16 sm:px-2 lg:relative lg:px-0 lg:py-20">
				<div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
					<div className="relative z-10 md:text-center lg:text-left">
						<div className="relative">
							<h1
								className={clsx(
									'inline bg-clip-text font-display text-4xl tracking-tight text-black sm:text-5xl dark:text-transparent dark:text-white'
								)}
							>
								Documentation
							</h1>

							<p
								className={clsx(
									'mt-3 text-xl tracking-tight text-slate-700 sm:text-2xl dark:text-[#A9A9A9]'
								)}
							>
								Sourcegraph allows developers to rapidly search,
								write, and understand code by bringing insights
								from their entire codebase right into the
								editor.
							</p>
						</div>
					</div>
					<div className="relative -mb-32 -mt-16 hidden items-center justify-center sm:flex lg:static xl:pl-10">
						<div className="inset-x-[-50vw] -bottom-48 -top-32 lg:absolute lg:-bottom-32 lg:-top-4 lg:left-[calc(40%+1rem)] lg:right-0 xl:left-[calc(51%+3rem)]">
							<HeroGradient className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 lg:left-0 lg:translate-x-0 lg:translate-y-[-60%]" />
							<HeroBackground className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-0 lg:translate-x-0 lg:translate-y-[-60%]" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
