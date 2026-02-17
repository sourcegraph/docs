'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';

type Release = {
	id: number;
	name: string;
	public: boolean;
	created_at: string;
	promoted_at: string;
	version: string;
	git_sha: string;
	is_development: boolean;
	tags: string[] | null;
	canonical_name: string;
};

function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
}

type LegacyRelease = {
	name: string;
	date: string;
	anchor?: string;
	url?: string;
};

const legacySupportedReleases: LegacyRelease[] = [
	{name: '5.10 Patch 1', date: 'December 2024', url: 'https://sourcegraph.com/changelog/releases/5.10.1164'},
	{name: '5.10 Patch 0', date: 'November 2024', url: 'https://sourcegraph.com/changelog/releases/5.10.0'},
	{name: '5.9 Patch 3', date: 'November 2024', url: 'https://sourcegraph.com/changelog/releases/5.9.1590'},
	{name: '5.9 Patch 2', date: 'November 2024', url: 'https://sourcegraph.com/changelog/releases/5.9.347'},
	{name: '5.9 Patch 1', date: 'November 2024', url: 'https://sourcegraph.com/changelog/releases/5.9.45'},
	{name: '5.9 Patch 0', date: 'October 2024', url: 'https://sourcegraph.com/changelog/releases/5.9.0'},
	{name: '5.8 Patch 1', date: 'October 2024', url: 'https://sourcegraph.com/changelog/releases/5.8.1579'},
	{name: '5.8 Patch 0', date: 'October 2024', url: 'https://sourcegraph.com/changelog/releases/5.8.0'},
	{name: '5.7 Patch 1', date: 'September 2024', url: 'https://sourcegraph.com/changelog/releases/5.7.2474'},
	{name: '5.7 Patch 0', date: 'September 2024', url: 'https://sourcegraph.com/changelog/releases/5.7.0'},
	{name: '5.6 Patch 2', date: 'August 2024', anchor: 'v562535'},
	{name: '5.6 Patch 1', date: 'August 2024', anchor: 'v56185'},
	{name: '5.6', date: 'August 2024', anchor: 'v560'},
	{name: '5.5', date: 'July 2024', anchor: 'v553956'},
	{name: '5.4', date: 'May 2024', anchor: 'v547765'},
	{name: '5.3', date: 'February 2024', anchor: 'v5312303'},
	{name: '5.2', date: 'October 2023', anchor: 'v527'},
	{name: '5.1', date: 'June 2023', anchor: 'v519'},
	{name: '5.0', date: 'March 2023', anchor: 'v506'}
];

export function SupportedReleasesTable() {
	const [releases, setReleases] = useState<Release[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const basePath = process.env.NEXT_PUBLIC_DOCS_BASE_PATH || '';
		fetch(`${basePath}/api/releases`)
			.then(res => {
				if (!res.ok) throw new Error('Failed to fetch releases');
				return res.json();
			})
			.then((data: Release[]) => {
				const supportedReleases = data.filter(
					r => r.public && !r.is_development
				);
				setReleases(supportedReleases);
				setLoading(false);
			})
			.catch(err => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return (
			<div className="flex items-center justify-center py-8">
				<div className="text-gray-500">Loading releases...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="rounded-md border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
				<p className="text-red-700 dark:text-red-400">
					Failed to load releases: {error}
				</p>
			</div>
		);
	}

	return (
		<div className="w-full overflow-x-auto">
			<table className="min-w-full">
				<thead>
					<tr>
						<th className="px-4 py-2 text-left font-semibold">
							Release
						</th>
						<th className="px-4 py-2 text-left font-semibold">
							General Availability Date
						</th>
						<th className="px-4 py-2 text-left font-semibold">
							Supported
						</th>
						<th className="px-4 py-2 text-left font-semibold">
							Release Notes
						</th>
						<th className="px-4 py-2 text-left font-semibold">
							Install
						</th>
					</tr>
				</thead>
				<tbody>
					{releases.map(release => (
						<tr key={release.id}>
							<td className="px-4 py-2">
								{release.canonical_name}
							</td>
							<td className="px-4 py-2">
								{formatDate(release.promoted_at)}
							</td>
							<td className="px-4 py-2">✅</td>
							<td className="px-4 py-2">
								<a
									href={`https://sourcegraph.com/changelog/releases/${release.version.replace(/^v/, '')}`}
									className="text-blue-600 hover:underline dark:text-blue-400"
								>
									Notes
								</a>
							</td>
							<td className="px-4 py-2">
								<Link
									href="/admin/deploy"
									className="text-blue-600 hover:underline dark:text-blue-400"
								>
									Install
								</Link>
							</td>
						</tr>
					))}
					{legacySupportedReleases.map(release => (
						<tr key={release.name}>
							<td className="px-4 py-2">{release.name}</td>
							<td className="px-4 py-2">{release.date}</td>
							<td className="px-4 py-2">✅</td>
							<td className="px-4 py-2">
								{release.url ? (
									<a
										href={release.url}
										className="text-blue-600 hover:underline dark:text-blue-400"
									>
										Notes
									</a>
								) : (
									<Link
										href={`/technical-changelog#${release.anchor}`}
										className="text-blue-600 hover:underline dark:text-blue-400"
									>
										Notes
									</Link>
								)}
							</td>
							<td className="px-4 py-2">
								<Link
									href="/admin/deploy"
									className="text-blue-600 hover:underline dark:text-blue-400"
								>
									Install
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export function DeprecatedReleasesTable() {
	const deprecatedReleases = [
		{version: '4.5', date: 'February 2023', anchor: 'v451'},
		{version: '4.4', date: 'January 2023', anchor: 'v442'},
		{version: '4.3', date: 'December 2022', anchor: 'v431'},
		{version: '4.2', date: 'November 2022', anchor: 'v421'},
		{version: '4.1', date: 'October 2022', anchor: 'v413'},
		{version: '4.0', date: 'September 2022', anchor: 'v401'},
		{
			version: '3.43',
			date: 'August 2022',
			url: 'https://github.com/sourcegraph/sourcegraph-public-snapshot/blob/main/CHANGELOG.md#3432'
		},
		{
			version: '3.42',
			date: 'July 2022',
			url: 'https://github.com/sourcegraph/sourcegraph-public-snapshot/blob/main/CHANGELOG.md#3422'
		},
		{
			version: '3.41',
			date: 'June 2022',
			url: 'https://github.com/sourcegraph/sourcegraph-public-snapshot/blob/main/CHANGELOG.md#3411'
		},
		{
			version: '3.40',
			date: 'May 2022',
			url: 'https://github.com/sourcegraph/sourcegraph-public-snapshot/blob/main/CHANGELOG.md#3402'
		},
		{
			version: '3.39',
			date: 'April 2022',
			url: 'https://github.com/sourcegraph/sourcegraph-public-snapshot/blob/main/CHANGELOG.md#3391'
		},
		{
			version: '3.38',
			date: 'March 2022',
			url: 'https://github.com/sourcegraph/sourcegraph-public-snapshot/blob/main/CHANGELOG.md#3381'
		},
		{
			version: '3.37',
			date: 'February 2022',
			url: 'https://github.com/sourcegraph/sourcegraph-public-snapshot/blob/main/CHANGELOG.md#3370'
		},
		{
			version: '3.36',
			date: 'January 2022',
			url: 'https://github.com/sourcegraph/sourcegraph-public-snapshot/blob/main/CHANGELOG.md#3363'
		},
		{
			version: '3.35',
			date: 'December 2021',
			url: 'https://github.com/sourcegraph/sourcegraph-public-snapshot/blob/main/CHANGELOG.md#3352'
		},
		{
			version: '3.34',
			date: 'November 2021',
			url: 'https://github.com/sourcegraph/sourcegraph-public-snapshot/blob/main/CHANGELOG.md#3342'
		},
		{
			version: '3.33',
			date: 'October 2021',
			url: 'https://github.com/sourcegraph/sourcegraph-public-snapshot/blob/main/CHANGELOG.md#3332'
		},
		{
			version: '3.32',
			date: 'September 2021',
			url: 'https://github.com/sourcegraph/sourcegraph-public-snapshot/blob/main/CHANGELOG.md#3321'
		},
		{
			version: '3.31',
			date: 'August 2021',
			url: 'https://github.com/sourcegraph/sourcegraph-public-snapshot/blob/main/CHANGELOG.md#3312'
		},
		{
			version: '3.30',
			date: 'July 2021',
			url: 'https://github.com/sourcegraph/sourcegraph-public-snapshot/blob/main/CHANGELOG.md#3304'
		},
		{
			version: '3.29',
			date: 'June 2021',
			url: 'https://github.com/sourcegraph/sourcegraph-public-snapshot/blob/main/CHANGELOG.md#3290'
		}
	];

	return (
		<div className="w-full overflow-x-auto">
			<table className="min-w-full">
				<thead>
					<tr>
						<th className="px-4 py-2 text-left font-semibold">
							Release
						</th>
						<th className="px-4 py-2 text-left font-semibold">
							General Availability Date
						</th>
						<th className="px-4 py-2 text-left font-semibold">
							Supported
						</th>
						<th className="px-4 py-2 text-left font-semibold">
							Release Notes
						</th>
					</tr>
				</thead>
				<tbody>
					{deprecatedReleases.map(release => (
						<tr key={release.version}>
							<td className="px-4 py-2">{release.version}</td>
							<td className="px-4 py-2">{release.date}</td>
							<td className="px-4 py-2">❌</td>
							<td className="px-4 py-2">
								{release.url ? (
									<a
										href={release.url}
										className="text-blue-600 hover:underline dark:text-blue-400"
									>
										Notes
									</a>
								) : (
									<Link
										href={`/technical-changelog#${release.anchor}`}
										className="text-blue-600 hover:underline dark:text-blue-400"
									>
										Notes
									</Link>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
