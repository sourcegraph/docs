export interface VersionI {
    name: string;
    label?: string; // Optional - Shown in the version dropdown
    url: string;
}

// Ensure the first entry is the latest active version
export const versions: VersionI[] = [
    {
        name: 'v5.2',
        label: 'latest',
        url: '/'
    },
];

export const latestVersion = versions[0];
