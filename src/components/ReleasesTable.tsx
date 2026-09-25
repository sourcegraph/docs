'use client';

import {useEffect, useState} from 'react';

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

// The registry reports versions as v8.0.0; the changelog URLs use 8.0.0
function versionNumber(release: Release): string {
	return release.version.replace(/^v/, '');
}

// Sourcegraph supports the two most recent major versions.
function majorVersion(release: Release): number {
	return Number(versionNumber(release).split('.')[0]);
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
							Release Date
						</th>
						<th className="px-4 py-2 text-left font-semibold">
							Changelog
						</th>
					</tr>
				</thead>
				<tbody>
					{releases.map(release => (
						<tr key={release.id}>
							<td className="px-4 py-2">{release.version}</td>
							<td className="px-4 py-2">
								{release.promoted_at.slice(0, 10)}
							</td>
							<td className="px-4 py-2">
								<a
									href={`https://sourcegraph.com/changelog/releases/${versionNumber(release)}`}
									className="text-blue-600 hover:underline dark:text-blue-400"
								>
									Notes
								</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
