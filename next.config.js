const config = require('./docs.config.js');
const {withContentlayer} = require('next-contentlayer');
const {updatedRedirectsData} = require('./src/data/redirects.ts');
const {generateRssFeed} = require('./dev/rss')
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
			// Redirect any path with pattern /docs/v/latest_sg/cody for example to /docs/cody
			{
				source: `/v/${config.DOCS_LATEST_VERSION}/:slug*`,
				destination: '/:slug*',
				permanent: false
			},
			// // Redirect for docs older than latest version e.g. https://x.x.sourcegraph.com/
			{
				source: '/docs/v/:version((?!config.DOCS_LATEST_VERSION).*)/:slug*',
				destination: '/docs/@:version/:slug*',
				permanent: false,
				basePath: false
			},
			{
				source: '/docs/@:version/:slug*',
				destination: 'https://:version.sourcegraph.com/:slug*',
				permanent: false,
				basePath: false
			},
		];
	}
};

module.exports = async () => {
	// placing this here so its part of nextjs's build process
	await generateRssFeed();
	return withContentlayer(nextConfig);
};
