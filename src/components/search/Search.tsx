import {useEffect, useState} from 'react';

import { DocSearch } from '@docsearch/react';

import '@docsearch/css';

export const Search = () => {
	let [modifierKey, setModifierKey] = useState<string>();

	useEffect(() => {
		const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
		setModifierKey(isMac ? '⌘' : 'Ctrl');
	}, []);

	return (
		<DocSearch
		  appId="0EBA2NRQU3"
		  indexName="sourcegraph"
		  apiKey="1b6e51c1d4ef24bef0a5f1ab00dad80a"
		/>
	  );
};
