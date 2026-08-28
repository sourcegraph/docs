'use client';

import {VersionI, versions} from '@/data/versions';
import {Menu, Transition} from '@headlessui/react';
import {
	ArrowUpRightIcon,
	CheckIcon,
	ChevronDownIcon
} from '@heroicons/react/20/solid';
import clsx from 'clsx';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Fragment, useEffect, useState} from 'react';

const versionsUrl =
	process.env.NEXT_PUBLIC_DOCS_VERSIONS_URL ??
	'https://sourcegraph.com/docs/api/versions';

function isVersion(value: unknown): value is VersionI {
	if (typeof value !== 'object' || value === null) return false;

	const version = value as Partial<VersionI>;
	return (
		typeof version.name === 'string' &&
		typeof version.url === 'string' &&
		(version.label === undefined || typeof version.label === 'string')
	);
}

export default function VersionSelector() {
	const path = usePathname();
	const [availableVersions, setAvailableVersions] =
		useState<VersionI[]>(versions);

	const segments = path.split('/');
	const versionIndex = segments.findIndex(segment => segment === 'v');
	const versionName = versionIndex >= 0 && segments[versionIndex + 1];
	const selectedVersionName = versionName
		? `v${versionName}`
		: versions[0].name;
	const selectedVersion =
		availableVersions.find(
			version => version.name === selectedVersionName
		) ?? versions[0];

	useEffect(() => {
		const controller = new AbortController();

		void fetch(versionsUrl, {signal: controller.signal})
			.then(response => (response.ok ? response.json() : null))
			.then((remoteVersions: unknown) => {
				if (
					!Array.isArray(remoteVersions) ||
					remoteVersions.length === 0 ||
					!remoteVersions.every(isVersion)
				) {
					return;
				}

				setAvailableVersions(
					remoteVersions.some(
						version => version.name === versions[0].name
					)
						? remoteVersions
						: [
								...remoteVersions,
								{...versions[0], label: undefined}
							]
				);
			})
			.catch(() => {
				// Keep this build's version list if the current site is unavailable.
			});

		return () => controller.abort();
	}, []);

	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button
					className="inline-flex w-full items-center justify-center gap-x-1.5
				rounded-md px-2 py-2 text-xs font-medium text-slate-500 shadow-sm ring-1 ring-inset ring-light-border-2 hover:bg-vermilion-08 hover:text-vermilion-11 dark:bg-dark-bg-2 dark:text-dark-paragraph-text dark:ring-inset dark:ring-dark-border"
				>
					{selectedVersion.label === 'latest'
						? 'Latest'
						: selectedVersion.name}
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
				<Menu.Items className="divide- absolute right-0 z-10 mt-2 flex max-h-[calc(100vh-12rem)] w-32 origin-top-right flex-col divide-light-border overflow-y-auto overscroll-contain rounded-md bg-light-bg-1 text-xs text-slate-500 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-dark-border dark:bg-dark-bg-2 dark:text-dark-paragraph-text sm:w-48 sm:text-sm">
					{/* Versions */}
					{availableVersions.length > 0 &&
						availableVersions.map((version, count) => (
							<Menu.Item key={version.name}>
								{({active}) => (
									<a
										href={version.url}
										target="_blank"
										aria-current={
											version.name ===
											selectedVersion.name
												? 'page'
												: undefined
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
										{version.label ? (
											<span className="font-medium text-link">
												{version.label}
											</span>
										) : version.name ===
										  selectedVersion.name ? (
											<span className="flex items-center gap-0.5 rounded bg-slate-700 px-1.5 py-0.5 text-[10px] font-medium text-white dark:bg-slate-200 dark:text-slate-900">
												<CheckIcon
													className="h-3 w-3"
													aria-hidden="true"
												/>
												selected
											</span>
										) : null}
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
