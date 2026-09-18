// sourcegraph.com proxies DOCS_BASE_PATH/* to this site. Previews and local dev
// use the same basePath so a root-relative URL that 404s in production 404s
// there too. To move the site, change DOCS_BASE_PATH here and the load balancer
// rule in sourcegraph/infrastructure; nothing else spells the path out.
const DOCS_BASE_PATH = '/docs';
const DOCS_PROD_ORIGIN = 'https://sourcegraph.com';

const config = {
	DOCS_LATEST_VERSION: '8.0',
	DOCS_BASE_PATH,
	DOCS_PROD_ORIGIN,
	DOCS_PROD_URL: `${DOCS_PROD_ORIGIN}${DOCS_BASE_PATH}`
};

module.exports = config;
