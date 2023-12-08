const {withContentlayer} = require('next-contentlayer');
const {updatedRedirectsData} = require('./src/data/redirects.ts');
/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	basePath: '/docs',
	async redirects() {
		return [...updatedRedirectsData];
	}
};

module.exports = withContentlayer(nextConfig);
