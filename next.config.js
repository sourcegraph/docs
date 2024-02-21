const config = require('./docs.config.js');
const {withContentlayer} = require('next-contentlayer');
const {updatedRedirectsData} = require('./src/data/redirects.ts');
/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	basePath: '/docs',
	async redirects() {
		return [
			...updatedRedirectsData,
			{
				source: `/v/${config.DOCS_LATEST_VERSION}/:slug`,
				destination: '/:slug',
				permanent: false
			}
		];
	}
};

module.exports = withContentlayer(nextConfig);
