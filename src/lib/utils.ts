import {type ClassValue, clsx} from 'clsx';
import config from 'docs.config';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// next/link and routing add the basePath; <img src>, <a href>, fetch() and
// metadata URLs do not, so root-relative URLs for those go through here.
export function withBasePath(url: string) {
	const isRootRelative = url.startsWith('/') && !url.startsWith('//');
	return isRootRelative ? `${config.DOCS_BASE_PATH}${url}` : url;
}
