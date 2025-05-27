import {MetadataRoute} from 'next';
import {getAllPublishedPosts, getAllVersionedPosts} from '@/lib/api';

const baseUrl = 'https://sourcegraph.com/docs';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const links = [
		{
			url: baseUrl,
			lastModified: new Date()
		}
	];

	const posts = await getAllPublishedPosts();
	if (posts) {
		posts.forEach(post => {
			links.push({
				url: `${baseUrl}${post.urlPath}`,
				lastModified: post.frontmatter?.date
					? new Date(post.frontmatter.date)
					: new Date()
			});
		});
	}

	const versions = ['6.3']; // Add your versions
	for (const version of versions) {
		const versionedPosts = await getAllVersionedPosts(version);
		if (versionedPosts) {
			versionedPosts.forEach(post => {
				links.push({
					url: `${baseUrl}${post.urlPath}`,
					lastModified: post.frontmatter?.date
						? new Date(post.frontmatter.date)
						: new Date()
				});
			});
		}
	}

	return links;
}
