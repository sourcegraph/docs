import { Button } from '@/components/Button';
import clsx from 'clsx';
import { HeroBackground } from './HeroBackground';
import { HeroGradient } from './HeroGradient';

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
									'inline bg-gradient-to-l from-[#FF5543] to-[#A112FF] bg-clip-text font-display text-4xl tracking-tight text-black dark:text-transparent sm:text-5xl'
								)}
							>
								Documentation
							</h1>

							<p
								className={clsx(
									'mt-3 text-xl tracking-tight text-slate-700 dark:text-slate-200 sm:text-2xl'
								)}
							>
								Sourcegraph is a Code Intelligence platform that
								deeply understands your code, no matter how
								large or where it’s hosted, to power modern
								developer experiences.
							</p>
							<div className="mt-8 flex gap-1 md:justify-center lg:justify-start">
								<Button
									href="/cody"
								// target="_blank"
								>
									Get started with Cody
								</Button>
								<Button
									className="group flex items-center"
									// target="_blank"
									href="/code_search"
									variant="ghost"
								>
									Explore Code Search
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
										className="ml-2 h-3 w-3 transform-gpu transition-transform group-hover:translate-x-1"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
										/>
									</svg>
								</Button>
							</div>
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
