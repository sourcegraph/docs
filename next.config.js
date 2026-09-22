const {PHASE_DEVELOPMENT_SERVER} = require('next/constants');
const {withContentlayer} = require('next-contentlayer2');
const {DOCS_BASE_PATH} = require('./docs.config.js');
/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	basePath: DOCS_BASE_PATH,
	// Orb portals proxy the dev server through a different hostname.
	allowedDevOrigins: process.env.PUBLIC_URL
		? [new URL(process.env.PUBLIC_URL).hostname]
		: [],
	// Nothing serves `/`, so the deployment URLs Vercel links from Slack / GitHub
	// and http://localhost:3000 would 404. sourcegraph.com never proxies `/` to
	// us. Stay on the same host so visitors see this exact deployment.
	async redirects() {
		return [
			{
				source: '/',
				destination: DOCS_BASE_PATH,
				basePath: false,
				permanent: false
			}
		];
	}
};

// withContentlayer is a webpack hook that regenerates .contentlayer when content
// changes, which `next dev --webpack` needs. `next build` uses Turbopack, with
// dev/build-content.mjs generating .contentlayer beforehand.
module.exports = phase =>
	phase === PHASE_DEVELOPMENT_SERVER
		? withContentlayer(nextConfig)
		: nextConfig;
