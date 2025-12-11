import config from 'docs.config';

export interface VersionI {
	name: string;
	label?: string; // Optional - Shown in the version dropdown
	url: string;
}

// Ensure the first entry is the latest active version
export const versions: VersionI[] = [
	{
		name: `v${config.DOCS_LATEST_VERSION}`,
		label: 'latest',
		url: '/docs'
	},
	{
		name: 'v6.10',
		url: 'https://6.10.sourcegraph.com/'
	},
	{
		name: 'v6.9',
		url: 'https://6.9.sourcegraph.com/'
	},
	{
		name: 'v6.8',
		url: 'https://6.8.sourcegraph.com/'
	},
	{
		name: 'v6.7',
		url: 'https://6.7.sourcegraph.com/'
	}
];

export const latestVersion = versions[0];
