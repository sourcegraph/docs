import React from 'react';
import {KBarSearchProvider} from './KBar';
import type {KBarConfig} from './KBar';

export type SearchConfig = KBarConfig;
export interface SearchConfigProps {
	searchConfig: SearchConfig;
	children: React.ReactNode;
}

/**
 * Command palette like search component - `ctrl-k` to open the palette.
 * Or use the search context to bind toggle to an onOpen event.
 * Currently supports Kbar (local search).
 * For Kbar:
 * ```
 * import { useKBar } from 'kbar'
 * const { query } = useKBar()
 * ```
 *
 * For Algolia:
 * ```
 * import { AlgoliaSearchContext } from 'pliny/search/algolia'
 * const { query } = useContext(AlgoliaSearchContext)
 * ```
 *
 * @param {SearchConfig} searchConfig
 * @return {*}
 */
export const SearchProvider = ({searchConfig, children}: SearchConfigProps) => {
	if (searchConfig && searchConfig.provider) {
		return (
			<KBarSearchProvider kbarConfig={searchConfig.kbarConfig}>
				{children}
			</KBarSearchProvider>
		);
	} else {
		return <>{children}</>;
	}
};
