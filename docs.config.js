const config = {
	DOCS_LATEST_VERSION: '8.0',
	// sourcegraph.com proxies /docs/* to this site. Previews and local dev use the
	// same basePath so a root-relative URL that 404s in production 404s there too.
	DOCS_BASE_PATH: '/docs'
};

module.exports = config;
