/**
 * Products that get a ranking boost at query time. Records in the
 * `sourcegraph_docs` index carry a `product` facet (see dev/algolia-index.mjs);
 * each entry here becomes an Algolia `optionalFilters` clause, so hits from
 * that product outrank otherwise-equal hits without hiding anything else.
 *
 * Score is an integer; higher wins. A boost of 3 is enough to put "Agentic
 * Batch Changes" above "Batch Changes" for the query "batch changes".
 */
export const productBoosts: Record<string, number> = {
	'Agentic Batch Changes': 3,
	'Deep Search': 2,
	'Code Search': 1
};

/**
 * Products offered as filter chips in the search modal, in display order.
 * Names must match the `product` facet values in the index (i.e. the topic
 * titles in src/data/navigation.ts).
 */
export const productFilters: string[] = [
	'Agentic Batch Changes',
	'Deep Search',
	'Code Search',
	'Code Navigation',
	'Batch Changes',
	'Code Insights',
	'Cody',
	'MCP Server',
	'Sourcegraph CLI',
	'Administration',
	'Self-hosted'
];

const optionalFilters = Object.entries(productBoosts).map(
	([product, score]) => `product:${product}<score=${score}>`
);

export const searchMetadata = {
	provider: 'kbar',
	kbarConfig: {
		searchDocumentsPath: '/docs/search.json' // path to load documents to search
	},
	// For Algolia
	// provider: 'algolia',
	algoliaConfig: {
		// The application ID provided by Algolia
		appId: '0EBA2NRQU3',
		// Public API key: it is safe to commit it
		apiKey: '1b6e51c1d4ef24bef0a5f1ab00dad80a',
		// Built by dev/algolia-index.mjs (not the Algolia crawler).
		indexName: 'sourcegraph_docs',
		maxResultsPerGroup: 20,
		searchParameters: {
			optionalFilters
		}
	}
};
