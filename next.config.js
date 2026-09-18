const {PHASE_DEVELOPMENT_SERVER} = require('next/constants');
const {withContentlayer} = require('next-contentlayer2');
const {OPTIMIZED_IMAGE_ORIGINS} = require('./docs.config');
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
	// MDX screenshots are uncompressed PNGs on GCS with a one-hour cache. ZoomableImage
	// routes them through `/_next/image`, which serves WebP from Vercel's edge cache.
	images: {
		remotePatterns: OPTIMIZED_IMAGE_ORIGINS.map(origin => new URL(`${origin}**`)),
		minimumCacheTTL: 60 * 60 * 24 * 7
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
	}
};

// withContentlayer is a webpack hook that regenerates .contentlayer when content
// changes, which `next dev --webpack` needs. `next build` uses Turbopack, with
// dev/build-content.mjs generating .contentlayer beforehand.
module.exports = phase =>
	phase === PHASE_DEVELOPMENT_SERVER
		? withContentlayer(nextConfig)
		: nextConfig;
