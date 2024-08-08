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
        url: '/',
    },
    {
        name: 'v5.5',
        url: 'https://5.5.sourcegraph.com/'
    },
    {
        name: 'v5.4',
        url: 'https://5.4.sourcegraph.com/docs'
    },
    {
        name: 'v5.3',
        url: 'https://5.3.sourcegraph.com/docs'
    },
];

export const latestVersion = versions[0];
