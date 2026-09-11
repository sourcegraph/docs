const {withContentlayer} = require('next-contentlayer');
const {execSync} = require('child_process');
const {updatedRedirectsData} = require('./src/data/redirects.js');
/** @type {import('next').NextConfig} */

function createStaticRedirects() {
	const seenSources = new Set();
	const redirects = [];

	for (const redirect of updatedRedirectsData) {
		if (
			redirect.source.includes('#') ||
			redirect.source.includes('?') ||
			seenSources.has(redirect.source)
		) {
			continue;
		}

		seenSources.add(redirect.source);
		redirects.push({...redirect, permanent: false});
	}

	return redirects;
}

const staticRedirects = createStaticRedirects();
console.log(`Configured ${staticRedirects.length} static redirects`);

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
	},
	redirects: async () => staticRedirects,
	rewrites: async () => ({
		beforeFiles: [{source: '/:path*.md', destination: '/api/md/:path*'}]
	})
};

module.exports = async () => {
	// placing this here so its part of nextjs's build process
	execSync('node dev/check-links.mjs', {stdio: 'inherit'});
	execSync('node dev/check-filenames.mjs', {stdio: 'inherit'});
	execSync('node dev/check-images.mjs', {stdio: 'inherit'});
	execSync('node dev/generate-mermaid-icons.mjs', {stdio: 'inherit'});
	return withContentlayer(nextConfig);
};
