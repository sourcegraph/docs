import {Button} from '@/components/Button';
import blurCyanImage from '@/images/blur-cyan.png';
import blurIndigoImage from '@/images/blur-indigo.png';
import clsx from 'clsx';
import Image from 'next/image';
import {HeroBackground} from './HeroBackground';

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
		<div className="overflow-hidden bg-dark-bg dark:-mb-32 dark:mt-[-4.75rem] dark:pb-32 dark:pt-[4.75rem]">
			<div className="py-16 sm:px-2 lg:relative lg:px-0 lg:py-20">
				<div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
					<div className="relative z-10 md:text-center lg:text-left">
						<Image
							className="absolute bottom-full right-full -mb-56 -mr-72 opacity-50"
							src={blurCyanImage}
							alt=""
							width={530}
							height={530}
							unoptimized
							priority
						/>
						<div className="relative">
							<h1
								className={clsx(
									'inline bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text font-display text-5xl tracking-tight text-transparent',
									' bg-clip-text text-transparent'
								)}
							>
								Documentation
							</h1>

							<p
								className={clsx(
									'mt-3 text-2xl tracking-tight text-slate-200'
								)}
							>
								Sourcegraph is a Code Intelligence platform that
								deeply understands your code, no matter how
								large or where it’s hosted, to power modern
								developer experiences.
							</p>
							<div className="mt-8 flex gap-1 md:justify-center lg:justify-start">
								<Button
									href="https://sourcegraph.com/sign-in?returnTo=/search"
									target="_blank"
								>
									Get started with Sourcegraph
								</Button>
								<Button
									className="group -ml-2 flex items-center"
									target="_blank"
									href="https://github.com/sourcegraph/sourcegraph"
									variant="ghost"
								>
									Explore Code AI
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										className="ml-2 h-3 w-3 transform-gpu transition-transform group-hover:translate-x-1"
									>
										<path
											stroke-linecap="round"
											strokeLinejoin="round"
											d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
										/>
									</svg>
								</Button>
							</div>
						</div>
					</div>
					<div className="relative -mb-32 -mt-16 hidden items-center justify-center sm:flex lg:static xl:pl-10">
						<div className="inset-x-[-50vw] -bottom-48 -top-32 [mask-image:linear-gradient(transparent,white,white)] dark:[mask-image:linear-gradient(transparent,white,transparent)] lg:absolute lg:-bottom-32 lg:-top-4 lg:left-[calc(40%+1rem)] lg:right-0 lg:[mask-image:none] lg:dark:[mask-image:linear-gradient(white,white,transparent)] xl:left-[calc(49%+1rem)]">
							<HeroBackground className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grayscale-[40%] filter lg:left-0 lg:translate-x-0 lg:translate-y-[-60%]" />
						</div>
						<div className="relative">
							<Image
								className="absolute -right-64 -top-64"
								src={blurCyanImage}
								alt=""
								width={530}
								height={530}
								unoptimized
								priority
							/>
							<Image
								className="absolute -bottom-40 -right-44"
								src={blurIndigoImage}
								alt=""
								width={567}
								height={567}
								unoptimized
								priority
							/>

							<div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-link via-link/70 to-blue-300 opacity-10 blur-lg" />
							<div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-link via-link/70 to-blue-300 opacity-10" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
