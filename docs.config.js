const config = {
	DOCS_LATEST_VERSION: '8.0',
	// Remote image origins that Next's optimizer may fetch, convert to WebP and cache.
	OPTIMIZED_IMAGE_ORIGINS: [
		'https://sourcegraphstatic.com/',
		'https://storage.googleapis.com/sourcegraph-assets/',
		'https://storage.googleapis.com/changelog-static-assets-prod/'
	]
};

module.exports = config;
