const {withContentlayer} = require('next-contentlayer');
const {generateRssFeed} = require('./dev/rss');
/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	// in prod, we serve the docs from sourcegraph.com/docs, and this requires special config on the GFE side
	// in preview/development, this is not necessary.
	//
	// VERCEL_ENV is a system env var set by Vercel
	// https://vercel.com/docs/projects/environment-variables/system-environment-variables
	// basePath: process.env.VERCEL_ENV === 'production' ? '/docs' : '',
	basePath: process.env.VERCEL_ENV === 'production' ? '/docs' : ''
};

module.exports = async () => {
	// placing this here so its part of nextjs's build process
	await generateRssFeed();
	return withContentlayer(nextConfig);
};
