const config = require('./docs.config.js');
const {withContentlayer} = require('next-contentlayer');
const {updatedRedirectsData} = require('./src/data/redirects.ts');
/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	// in prod, we serve the docs from sourcegraph.com/docs, and this requires special config on the GFE side
	// in preview/development, this is not necessary.
	//
	// VERCEL_ENV is a system env var set by Vercel
	// https://vercel.com/docs/projects/environment-variables/system-environment-variables
	basePath: process.env.VERCEL_ENV === 'production' ? '/docs' : '',
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
