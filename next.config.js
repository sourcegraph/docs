const {withContentlayer} = require('next-contentlayer2');
/** @type {import('next').NextConfig} */

// in prod, we serve the docs from sourcegraph.com/docs, and this requires special config on the GFE side
// in preview/development, this is not necessary.
//
// VERCEL_ENV is a system env var set by Vercel
// https://vercel.com/docs/projects/environment-variables/system-environment-variables
const basePath = process.env.VERCEL_ENV === 'production' ? '/docs' : '';

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
	// With basePath set, nothing serves `/`, so the *.vercel.app deployment URL
	// that Vercel links from Slack / GitHub 404s. sourcegraph.com never proxies
	// `/` to us, so this only affects visitors opening that raw URL. Stay on the
	// same host so they see this exact deployment, not whatever is live.
	async redirects() {
		if (!basePath) return [];
		return [
			{
				source: '/',
				destination: basePath,
				basePath: false,
				permanent: false
			}
		];
	},
	// Vercel's skew protection appends `?dpl=<deployment id>` to asset URLs.
	// `next/font` bakes that query into the CSS `url()`s at build time, but
	// Next's webpack cache key ignores the deployment id, so a restored
	// `.next/cache` re-emits CSS with the previous deployment's id and every
	// font downloads twice (once per id). Fold the id into the cache key.
	webpack(config) {
		const deploymentId = process.env.NEXT_DEPLOYMENT_ID;
		if (deploymentId && config.cache) {
			config.cache.version = `${config.cache.version}|${deploymentId}`;
		}
		return config;
	}
};

module.exports = withContentlayer(nextConfig);
