const {PHASE_DEVELOPMENT_SERVER} = require('next/constants');
const {withContentlayer} = require('next-contentlayer2');
/** @type {import('next').NextConfig} */

// sourcegraph.com proxies /docs/* to this site. Previews and local dev use the
// same basePath so that a root-relative URL which 404s in production also 404s
// there, instead of only breaking after deploy.
const basePath = '/docs';

const nextConfig = {
	reactStrictMode: true,
	basePath,
	// Orb portals proxy the dev server through a different hostname.
	allowedDevOrigins: process.env.PUBLIC_URL
		? [new URL(process.env.PUBLIC_URL).hostname]
		: [],
	env: {
		NEXT_PUBLIC_DOCS_BASE_PATH: basePath
	},
	// Nothing serves `/`, so the deployment URLs Vercel links from Slack / GitHub
	// and http://localhost:3000 would 404. sourcegraph.com never proxies `/` to
	// us. Stay on the same host so visitors see this exact deployment.
	async redirects() {
		return [
			{
				source: '/',
				destination: basePath,
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
