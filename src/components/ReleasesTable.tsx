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

// Sourcegraph supports the two most recent major versions.
function majorVersion(release: Release): number {
	return Number(release.version.replace(/^v/, '').split('.')[0]);
}

function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
}

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
				const published = data.filter(
					r => r.public && !r.is_development
				);
				const newestMajor = Math.max(...published.map(majorVersion));
				setReleases(
					published.filter(r => majorVersion(r) >= newestMajor - 1)
				);
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
				</tbody>
			</table>
		</div>
	);
}
