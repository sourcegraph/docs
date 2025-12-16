'use client';

import {VersionI, versions} from '@/data/versions';
import {Menu, Transition} from '@headlessui/react';
import {ArrowUpRightIcon, ChevronDownIcon} from '@heroicons/react/20/solid';
import clsx from 'clsx';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Fragment, useEffect, useState} from 'react';

export default function VersionSelector() {
	const path = usePathname();

	const [selectedVersion, setSelectedVersion] = useState<VersionI>(
		versions[0]
	);

	useEffect(() => {
		// Extract the version name from the URL path, if any
		const segments = path.split('/');
		const versionIndex = segments.findIndex(segment => segment === 'v');
		// Versioned link example:
		// docs/v/5.1.2/ where versionName = 5.1.2
		const versionName = versionIndex >= 0 && segments[versionIndex + 1];
		if (!versionName) {
			setSelectedVersion(versions[0]);
			return;
		}

		// If version exists, select it
		const matchedVersion = versions.find(version =>
			version.url.includes(versionName)
		);
		if (matchedVersion) setSelectedVersion(matchedVersion);
	}, [path]);

	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button
					className="inline-flex w-full items-center justify-center gap-x-1.5
				rounded-md px-2 py-2 text-xs font-medium text-slate-500 shadow-sm ring-1 ring-inset ring-light-border-2 hover:bg-vermilion-08 hover:text-vermilion-11 dark:bg-dark-bg-2 dark:text-dark-paragraph-text dark:ring-inset dark:ring-dark-border"
				>
					{selectedVersion.label === 'latest' ? 'Latest' : selectedVersion.name}
					<ChevronDownIcon
						className="-mr-1 h-4 w-4"
						aria-hidden="true"
					/>
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="divide- absolute right-0 z-10 mt-2 flex w-32 origin-top-right flex-col divide-light-border rounded-md bg-light-bg-1 text-xs text-slate-500 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:w-48 sm:text-sm dark:divide-dark-border dark:bg-dark-bg-2 dark:text-dark-paragraph-text">
					{/* Versions */}
					{versions.length > 0 &&
						versions.map((version, count) => (
							<Menu.Item key={version.name}>
								{({active}) => (
									<a
										href={version.url}
										target="_blank"
										onClick={() =>
											setSelectedVersion(version)
										}
										className={clsx(
											'hover:bg-vermilion-08 hover:text-vermilion-11',
											active &&
												'bg-vermilion-08 text-vermilion-11',
											count === 0 && 'rounded-t-md',
											'flex w-full items-center justify-between px-3 py-2'
										)}
									>
										{version.name}
										{version.label && (
											<span className="font-medium text-link">
												{version.label}
											</span>
										)}
									</a>
								)}
							</Menu.Item>
						))}
					{/* Legacy versions */}
					<Menu.Item>
						{({active}) => (
							<Link
								href="/legacy"
								className={clsx(
									active &&
										'bg-vermilion-08 text-vermilion-11',
									'flex items-center justify-between rounded-b-md px-3 py-2'
								)}
							>
								Legacy versions
								<ArrowUpRightIcon className="h-3 w-3" />
							</Link>
						)}
					</Menu.Item>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
