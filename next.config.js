const {withContentlayer} = require('next-contentlayer');
const {execSync} = require('child_process');
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

module.exports = async () => {
	// placing this here so its part of nextjs's build process
	execSync('node dev/check-links.mjs', {stdio: 'inherit'});
	execSync('node dev/check-filenames.mjs', {stdio: 'inherit'});
	execSync('node dev/check-images.mjs', {stdio: 'inherit'});
	execSync('node dev/generate-mermaid-icons.mjs', {stdio: 'inherit'});
	return withContentlayer(nextConfig);
};
