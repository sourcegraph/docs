import {MetadataRoute} from 'next';
import {headers} from 'next/headers';
import {allPosts} from 'contentlayer/generated';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const headersList = await headers();
	const host = headersList.get('host') || 'sourcegraph.com';
	const protocol = host.includes('localhost') ? 'http' : 'https';
	const docsPath = host === 'sourcegraph.com' ? '/docs' : '';
	const baseUrl = `${protocol}://${host}${docsPath}`;

	const links: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1.0
		}
	];

	allPosts.forEach(post => {
		const priority = post.seoPriority;
		links.push({
			url: `${baseUrl}${post.url}`,
			lastModified: post.date ? new Date(post.date) : new Date(),
			changeFrequency: 'weekly',
			...(priority !== undefined && priority !== 0.5 && {priority})
		});
	});

	return links;
}
