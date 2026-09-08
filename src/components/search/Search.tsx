import {useEffect, useState} from 'react';
import {searchMetadata} from '../../data/search';
import {DocSearch} from './docsearch/DocSearch';
import type {DocSearchHit} from './docsearch/types';
import './docsearch/docsearch.css';

// import '@docsearch/css';

// The Algolia crawler indexes production, so every hit URL is absolute
// (https://sourcegraph.com/docs/...). Rewrite them to root-relative paths so
// results resolve against whichever deployment is being viewed (Vercel
// preview, local dev, or prod) instead of always jumping to prod.
const PROD_DOCS_URL_PREFIX = 'https://sourcegraph.com/docs';
const basePath = process.env.NEXT_PUBLIC_DOCS_BASE_PATH || '';

const toLocalUrl = (url: string): string =>
	url.startsWith(PROD_DOCS_URL_PREFIX)
		? basePath + url.slice(PROD_DOCS_URL_PREFIX.length)
		: url;

const transformItems = (items: DocSearchHit[]): DocSearchHit[] =>
	items.map(item => ({...item, url: toLocalUrl(item.url)}));

const getInitialQuery = () => {
	if (typeof window !== 'undefined' && window?.location?.href) {
		const url = new URL(window.location.href);
		const hashQuery = url.hash?.slice(1);
		const params = new URLSearchParams(hashQuery);
		const query = params.get('q');
		return query ?? undefined;
	}
};

export const Search = () => {
	let [modifierKey, setModifierKey] = useState<string>();

	useEffect(() => {
		const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
		setModifierKey(isMac ? '⌘' : 'Ctrl');
	}, []);

	const initialQuery = getInitialQuery();
	const {algoliaConfig} = searchMetadata;
	return (
		<DocSearch
			appId={algoliaConfig.appId}
			indexName={algoliaConfig.indexName}
			apiKey={algoliaConfig.apiKey}
			initialQuery={initialQuery}
			maxResultsPerGroup={algoliaConfig.maxResultsPerGroup}
			transformItems={transformItems}
		/>
	);
};
