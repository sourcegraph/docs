'use client';

import {Suspense, useCallback, useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname, useSearchParams} from 'next/navigation';
import {Dialog} from '@headlessui/react';
import {Navigation} from '@/components/Navigation';
import {ThemeSelector} from '@/components/ThemeSelector';

function MenuIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			fill="none"
			strokeWidth="2"
			strokeLinecap="round"
			{...props}
		>
			<path d="M4 7h16M4 12h16M4 17h16" />
		</svg>
	);
}

function CloseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			fill="none"
			strokeWidth="2"
			strokeLinecap="round"
			{...props}
		>
			<path d="M5 5l14 14M19 5l-14 14" />
		</svg>
	);
}

function CloseOnNavigation({close}: {close: () => void}) {
	let pathname = usePathname();
	let searchParams = useSearchParams();
	let location = `${pathname}?${searchParams.toString()}`;
	let previousLocation = useRef(location);

	useEffect(() => {
		if (previousLocation.current !== location) {
			previousLocation.current = location;
			close();
		}
	}, [location, close]);

	return null;
}

export function MobileNavigation() {
	let [isOpen, setIsOpen] = useState(false);
	let close = useCallback(() => setIsOpen(false), [setIsOpen]);

	function onLinkClick(event: React.MouseEvent<HTMLAnchorElement>) {
		let link = event.currentTarget;
		if (
			link.pathname + link.search + link.hash ===
			window.location.pathname +
				window.location.search +
				window.location.hash
		) {
			close();
		}
	}

	return (
		<>
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className="relative flex h-11 w-11 items-center justify-center"
				aria-label="Open navigation"
			>
				<MenuIcon className="h-6 w-6 stroke-slate-500" />
			</button>
			<Suspense fallback={null}>
				<CloseOnNavigation close={close} />
			</Suspense>
			<Dialog
				open={isOpen}
				onClose={() => close()}
				className="fixed inset-0 z-50 flex items-start overflow-y-auto bg-slate-900/50 pr-10 backdrop-blur lg:hidden"
				aria-label="Navigation"
			>
				<Dialog.Panel className="flex h-dvh w-full max-w-xs flex-col bg-light-bg px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2.5 dark:bg-dark-bg sm:px-6">
					<div className="flex shrink-0 items-center">
						<button
							type="button"
							onClick={() => close()}
							className="-ml-2 flex h-11 w-11 items-center justify-center"
							aria-label="Close navigation"
						>
							<CloseIcon className="h-6 w-6 stroke-slate-500" />
						</button>
						<Link
							href="/"
							className="ml-2 flex h-11 w-11 items-center justify-center"
							aria-label="Home page"
						>
							<Image
								className="h-6 w-6"
								src="/sourcegraph-mark.svg"
								alt="Sourcegraph Docs"
								width={36}
								height={36}
							/>
						</Link>
					</div>
					<div className="mt-5 min-h-0 flex-1 overflow-y-auto overscroll-contain pb-5">
						<Suspense fallback={null}>
							<Navigation
								className="px-1"
								onLinkClick={onLinkClick}
							/>
						</Suspense>
					</div>
					<div className="shrink-0 border-t border-light-border pt-2 dark:border-dark-border">
						<ThemeSelector showLabel className="relative" />
						<a
							href="https://github.com/sourcegraph/docs"
							className="flex min-h-11 items-center justify-between rounded-md px-1 text-sm text-slate-500 hover:text-vermilion-11 dark:text-dark-text-secondary dark:hover:text-vermilion-11"
						>
							GitHub <span aria-hidden="true">↗</span>
						</a>
						{/* Plain anchor, so next/link does not prefetch the changelog app */}
						<a
							href="https://sourcegraph.com/changelog"
							className="flex min-h-11 items-center justify-between rounded-md px-1 text-sm text-slate-500 hover:text-vermilion-11 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vermilion-11/50 dark:text-dark-text-secondary dark:hover:text-vermilion-11"
						>
							Changelog <span aria-hidden="true">↗</span>
						</a>
					</div>
				</Dialog.Panel>
			</Dialog>
		</>
	);
}
