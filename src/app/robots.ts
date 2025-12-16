import {MetadataRoute} from 'next';
import {headers} from 'next/headers';

export default async function robots(): Promise<MetadataRoute.Robots> {
	const headersList = await headers();
	const host = headersList.get('host') || 'sourcegraph.com';
	const protocol = host.includes('localhost') ? 'http' : 'https';
	const docsPath = host === 'sourcegraph.com' ? '/docs' : '';
	const baseUrl = `${protocol}://${host}${docsPath}`;

	const vercelEnv = process.env.VERCEL_ENV;
	// Only allow robots for the latest version (and local dev), the versioned
	// historic docs pages should not be crawled by search engines.
	const allowRobots =
		(vercelEnv === 'production' && host === 'sourcegraph.com') ||
		vercelEnv === undefined;

	return {
		rules: {
			userAgent: '*',
			allow: allowRobots ? '/' : undefined,
			disallow: allowRobots ? undefined : '/'
		},
		sitemap: allowRobots ? `${baseUrl}/sitemap.xml` : undefined
	};
}
