import {withBasePath} from '@/lib/utils';
import config from 'docs.config';
import {productFilters, searchMetadata} from '../../data/search';
import {DocSearch} from './docsearch/DocSearch';
import type {DocSearchHit} from './docsearch/types';
import './docsearch/docsearch.css';

// import '@docsearch/css';

// The Algolia crawler indexes production, so every hit URL is absolute.
// Rewrite them to root-relative paths so results stay on whichever deployment
// is being viewed.
const toLocalUrl = (url: string): string =>
	url.startsWith(config.DOCS_PROD_URL)
		? withBasePath(url.slice(config.DOCS_PROD_URL.length))
		: url;

const hitPriority = (hit: DocSearchHit): number => {
	if (hit.type === 'lvl1') return 0;
	if (hit.type === 'content') return 2;
	return 1;
};

const normalizeSnippet = (hit: DocSearchHit): string =>
	(hit._snippetResult.content?.value || hit.content || '')
		.replace(/<\/?mark>/g, '')
		.replace(/\s+/g, ' ')
		.trim()
		.toLowerCase();

const transformItems = (items: DocSearchHit[]): DocSearchHit[] => {
	const snippets = new Set<string>();

	return items
		.map((item, index) => ({item, index}))
		.sort(
			(a, b) =>
				hitPriority(a.item) - hitPriority(b.item) || a.index - b.index
		)
		.filter(({item}) => {
			if (item.type !== 'content') return true;
			const snippet = normalizeSnippet(item);
			if (!snippet) return true;
			if (snippets.has(snippet)) return false;
			snippets.add(snippet);
			return true;
		})
		.map(({item}) => ({...item, url: toLocalUrl(item.url)}));
};

const getInitialQuery = () => {
	if (typeof window !== 'undefined' && window?.location?.href) {
		const url = new URL(window.location.href);
		const sharedQuery = url.searchParams.get('search');
		const hashQuery = url.hash?.slice(1);
		const params = new URLSearchParams(hashQuery);
		const query = sharedQuery || params.get('q');
		return query ?? undefined;
	}
};

export const Search = () => {
	const initialQuery = getInitialQuery();
	const {algoliaConfig} = searchMetadata;
	return (
		<DocSearch
			appId={algoliaConfig.appId}
			indexName={algoliaConfig.indexName}
			apiKey={algoliaConfig.apiKey}
			initialQuery={initialQuery}
			maxResultsPerGroup={algoliaConfig.maxResultsPerGroup}
			searchParameters={algoliaConfig.searchParameters}
			productFilters={productFilters}
			transformItems={transformItems}
		/>
	);
};
