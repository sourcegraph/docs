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
		name: 'v7.7',
		url: 'https://7.7.sourcegraph.com'
	},
	{
		name: 'v7.6',
		url: 'https://7.6.sourcegraph.com'
	},
	{
		name: 'v7.5',
		url: 'https://7.5.sourcegraph.com'
	},
	{
		name: 'v7.4',
		url: 'https://7.4.sourcegraph.com'
	},
	{
		name: 'v7.3',
		url: 'https://7.3.sourcegraph.com'
	},
	{
		name: 'v7.2',
		url: 'https://7.2.sourcegraph.com'
	},
	{
		name: 'v7.1',
		url: 'https://7.1.sourcegraph.com'
	},
	{
		name: 'v7.0',
		url: 'https://7.0.sourcegraph.com'
	}
];
