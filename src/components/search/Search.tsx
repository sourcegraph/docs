import {useEffect, useState} from 'react';
import {searchMetadata} from '../../data/search';
import {DocSearch} from './docsearch/DocSearch';
import './docsearch/docsearch.css';

// import '@docsearch/css';

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
		/>
	);
};
