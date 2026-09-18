'use client';

import {Suspense, useCallback, useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname, useSearchParams} from 'next/navigation';
import {Dialog} from '@headlessui/react';
import {Navigation} from '@/components/Navigation';
import {withBasePath} from '@/lib/utils';

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
				className="relative"
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
				<Dialog.Panel className="min-h-full w-full max-w-xs bg-light-bg px-4 pb-12 pt-5 dark:bg-dark-bg sm:px-6">
					<div className="flex items-center">
						<button
							type="button"
							onClick={() => close()}
							aria-label="Close navigation"
						>
							<CloseIcon className="h-6 w-6 stroke-slate-500" />
						</button>
						<Link href="/" className="ml-6" aria-label="Home page">
							<Image
								className="h-9 w-9"
								src={withBasePath('/sourcegraph-mark.svg')}
								alt="Sourcegraph Docs"
								width={36}
								height={36}
							/>
						</Link>
					</div>
					{/* Plain anchor, so next/link does not prefetch the changelog app */}
					<a
						href="https://sourcegraph.com/changelog"
						className="mt-5 inline-flex rounded-md px-1 text-base font-medium text-slate-500 hover:text-vermilion-11 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vermilion-11/50 dark:text-dark-text-secondary dark:hover:text-vermilion-11"
					>
						Changelog
						<span className="ml-1" aria-hidden="true">
							↗
						</span>
					</a>
					<Suspense fallback={null}>
						<Navigation
							className="mt-5 px-1"
							onLinkClick={onLinkClick}
						/>
					</Suspense>
				</Dialog.Panel>
			</Dialog>
		</>
	);
}
