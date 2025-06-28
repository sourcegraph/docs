import {getAllPublishedPosts, getAllVersionedPosts} from './api';

export async function generateSearchIndex() {
	// Get all standard MDX files
	const allPosts = await getAllPublishedPosts();

	// Get versioned MDX files
	const versions = ['6.3']; // Replace with your actual versions
	const versionedPostsPromises = versions.map(version =>
		getAllVersionedPosts(version)
	);
	const versionedPostsArrays = await Promise.all(versionedPostsPromises);
	const versionedPosts = versionedPostsArrays.flat().filter(Boolean);

	// Combine and format for search
	const searchItems = [
		...(allPosts || []).map(post => ({
			url: post.urlPath,
			title: post.headings[0]?.title || 'Untitled',
			date: post.frontmatter?.date,
			headings: post.headings
		})),
		...versionedPosts.map(post => ({
			// @ts-ignore
			url: post.urlPath, // @ts-ignore
			title: post.headings[0]?.title || 'Untitled', // @ts-ignore
			date: post.frontmatter?.date, // @ts-ignore
			headings: post.headings, // @ts-ignore
			version: post.urlPath.match(/\/v\/([^\/]+)\//)?.[1]
		}))
	];

	return searchItems;
}
