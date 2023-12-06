const {withContentlayer} = require('next-contentlayer');
const {redirects} = require('./src/data/redirects.ts');
/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	basePath: '/docs',
	async redirects() {
		return [
			{
				// No need to add /docs as base url is /docs
				source: '/dev/roadmap',
				destination: 'https://sourcegraph.com/direction',
				permanent: true
				// If 308 then set true, otherwise false
			}
		];
	}
};

module.exports = withContentlayer(nextConfig);
