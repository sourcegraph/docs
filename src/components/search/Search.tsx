import { useEffect, useState } from 'react';

import { DocSearch } from './docsearch/DocSearch';
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
}

export const Search = () => {
	let [modifierKey, setModifierKey] = useState<string>();

	useEffect(() => {
		const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
		setModifierKey(isMac ? '⌘' : 'Ctrl');
	}, []);

	const initialQuery = getInitialQuery();
	return (
		<DocSearch
			appId="0EBA2NRQU3"
			indexName="sourcegraph"
			apiKey="1b6e51c1d4ef24bef0a5f1ab00dad80a"
			initialQuery={initialQuery}
		/>
	);
};
