'use client';

import {useEffect} from 'react';

import {CHANGELOG_URL} from '@/data/constants';

/**
 * Sends deep links into the old technical changelog to the record of truth for
 * that release. The docs page only keeps release notes for 5.4.5099 through
 * 5.6.2535, which exist nowhere else; every other version lives at one of
 * these two places:
 *
 * - 5.7.0 and newer: sourcegraph.com/changelog/releases/<version>
 * - 5.4.2198 and older: CHANGELOG.md in sourcegraph/sourcegraph-public-snapshot
 *
 * Browsers keep the URL fragment across server redirects but never send it to
 * the server, so this has to run on the client.
 */

const GITHUB_CHANGELOG_URL =
	'https://github.com/sourcegraph/sourcegraph-public-snapshot/blob/main/CHANGELOG.md';

// Releases published on sourcegraph.com/changelog/releases.
const SOURCEGRAPH_COM_VERSIONS = [
	'5.7.0',
	'5.7.2474',
	'5.8.0',
	'5.8.1579',
	'5.9.0',
	'5.9.45',
	'5.9.347',
	'5.9.1590',
	'5.9.17785',
	'5.10.0',
	'5.10.1164',
	'5.10.2832',
	'5.10.3940',
	'5.11.0',
	'5.11.2732',
	'5.11.3601',
	'5.11.4013',
	'5.11.5234',
	'5.11.6271',
	'6.0.0',
	'6.0.2687',
	'6.0.12741',
	'6.1.0',
	'6.1.376',
	'6.1.1295',
	'6.1.2889',
	'6.1.4020',
	'6.1.5633',
	'6.2.0',
	'6.2.1106',
	'6.2.2553',
	'6.2.3841',
	'6.3.0',
	'6.3.2692',
	'6.3.4167',
	'6.4.0',
	'6.4.1203',
	'6.4.2622',
	'6.4.3889',
	'6.5.0',
	'6.5.1211',
	'6.5.2654',
	'6.6.0',
	'6.6.868',
	'6.6.2517',
	'6.7.0',
	'6.7.229',
	'6.7.375',
	'6.7.1104',
	'6.7.2518',
	'6.7.2720',
	'6.8.0',
	'6.8.2313',
	'6.9.0',
	'6.9.902',
	'6.9.1277',
	'6.9.2509',
	'6.10.0',
	'6.10.3349',
	'6.11.0',
	'6.11.1446',
	'6.11.2752',
	'6.11.5428',
	'6.11.5639',
	'6.12.0',
	'6.12.1271'
];

// Releases whose notes are headings in the public snapshot's CHANGELOG.md.
const GITHUB_CHANGELOG_VERSIONS = [
	'4.0.0',
	'4.0.1',
	'4.1.0',
	'4.1.1',
	'4.1.2',
	'4.1.3',
	'4.2.0',
	'4.2.1',
	'4.3.0',
	'4.3.1',
	'4.4.0',
	'4.4.1',
	'4.4.2',
	'4.5.0',
	'4.5.1',
	'5.0.0',
	'5.0.1',
	'5.0.2',
	'5.0.3',
	'5.0.4',
	'5.0.5',
	'5.0.6',
	'5.1.0',
	'5.1.1',
	'5.1.2',
	'5.1.3',
	'5.1.4',
	'5.1.5',
	'5.1.6',
	'5.1.7',
	'5.1.8',
	'5.1.9',
	'5.2.0',
	'5.2.1',
	'5.2.2',
	'5.2.3',
	'5.2.4',
	'5.2.5',
	'5.2.6',
	'5.2.7',
	'5.3.0',
	'5.3.1',
	'5.3.2',
	'5.3.3',
	'5.3.9104',
	'5.3.11625',
	'5.3.12303',
	'5.4.0',
	'5.4.2198'
];

// Heading slugs drop the dots: "v5.6.185" becomes "v56185". GitHub release
// notes link with the same slug minus the leading "v".
const slug = (version: string) => version.replace(/\./g, '');

const bySlug = new Map<string, string>();
for (const version of SOURCEGRAPH_COM_VERSIONS) {
	bySlug.set(slug(version), `${CHANGELOG_URL}/releases/${version}`);
}
for (const version of GITHUB_CHANGELOG_VERSIONS) {
	bySlug.set(slug(version), `${GITHUB_CHANGELOG_URL}#${slug(version)}`);
}

export function targetForHash(hash: string): string | undefined {
	const anchor = hash.replace(/^#/, '').replace(/^v/i, '');
	const external = bySlug.get(anchor);
	if (external) {
		return external;
	}
	// A GitHub-style fragment such as #56185 for a release kept on this page:
	// point it at the heading, which is slugged with the leading "v".
	if (/^#\d+$/.test(hash) && document.getElementById(`v${anchor}`)) {
		return `#v${anchor}`;
	}
	return undefined;
}

export function TechnicalChangelogRedirect() {
	useEffect(() => {
		const target = targetForHash(window.location.hash);
		if (target) {
			window.location.replace(target);
		}
	}, []);

	return null;
}
