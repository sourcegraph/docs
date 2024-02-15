export interface VersionI {
    name: string;
    label?: string; // Optional - Shown in the version dropdown
    url: string;
}

// Ensure the first entry is the latest active version
export const versions: VersionI[] = [
    {
        name: 'v5.3',
        label: 'latest',
        url: '/'
    },
    {
        name: 'v5.2',
        url: '/v/5.2'
    },
];

export const latestVersion = versions[0];
