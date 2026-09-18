import {MetadataRoute} from 'next';
import {allPosts} from 'contentlayer/generated';
import config from 'docs.config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const links: MetadataRoute.Sitemap = [
		{
			url: config.DOCS_PROD_URL,
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
				url: `${config.DOCS_PROD_URL}${post.url}`,
				lastModified: post.date ? new Date(post.date) : new Date(),
				changeFrequency: 'weekly',
				...(priority !== undefined && priority !== 0.5 && {priority})
			});
		});

	return links;
}
