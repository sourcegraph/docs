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
		indexName: 'sourcegraph',
		maxResultsPerGroup: 20
	}
};
