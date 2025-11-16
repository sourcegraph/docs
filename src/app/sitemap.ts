import {MetadataRoute} from 'next';
import {allPosts} from 'contentlayer/generated';

const baseUrl = 'https://sourcegraph.com/docs';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const links = [
		{
			url: baseUrl,
			lastModified: new Date()
		}
	];

	allPosts.forEach(post => {
		links.push({
			url: `${baseUrl}${post.url}`,
			lastModified: post.date ? new Date(post.date) : new Date()
		});
	});

	return links;
}
