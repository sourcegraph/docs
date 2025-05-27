/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	basePath: '/docs',
	transpilePackages: ['next-mdx-remote'],
	outputFileTracingIncludes: {
		'/': ['./docs/**/*']
	},
	webpack: (config, {isServer}) => {
		// Fix for fs/promises in client-side code
		if (!isServer) {
			config.resolve.fallback = {
				...config.resolve.fallback,
				fs: false,
				'fs/promises': false,
				path: false
			};
		}
		return config;
	}
};

export default nextConfig;
