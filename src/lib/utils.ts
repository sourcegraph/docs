import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Production serves the site under /docs (basePath in next.config.js). next/link
// adds it to hrefs, but <img src> and next/image do not, so a root-relative path
// to a file in public/ 404s on sourcegraph.com unless prefixed here.
export function withBasePath(url: string) {
	const basePath = process.env.NEXT_PUBLIC_DOCS_BASE_PATH || '';
	const isRootRelative = url.startsWith('/') && !url.startsWith('//');
	return isRootRelative ? `${basePath}${url}` : url;
}
