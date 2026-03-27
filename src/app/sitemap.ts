import {MetadataRoute} from 'next';
import {allPosts} from 'contentlayer/generated';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = 'https://sourcegraph.com/docs';

	const links: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1.0
		}
	];

	allPosts
		.filter(post => !post.preview)
		.forEach(post => {
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
