const {withContentlayer} = require('next-contentlayer2');
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
	basePath: process.env.VERCEL_ENV === 'production' ? '/docs' : '',
	env: {
		NEXT_PUBLIC_DOCS_BASE_PATH:
			process.env.VERCEL_ENV === 'production' ? '/docs' : ''
	}
};

module.exports = withContentlayer(nextConfig);
