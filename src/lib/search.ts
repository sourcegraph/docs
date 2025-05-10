import {getAllMdxFiles, getAllVersionedMdxFiles} from './mdx';

export async function generateSearchIndex() {
	// Get all standard MDX files
	const allPosts = await getAllMdxFiles();

	// Get versioned MDX files - you would need to define what versions to include
	const versions = ['6.3']; // Example version - replace with your actual versions
	const versionedPostsPromises = versions.map(version =>
		getAllVersionedMdxFiles(version)
	);
	const versionedPostsArrays = await Promise.all(versionedPostsPromises);
	const versionedPosts = versionedPostsArrays.flat();

	// Combine and format for search
	const searchItems = [
		...allPosts.map(post => ({
			url: `/${post.slug.join('/')}`,
			title: post.headings[0]?.title || 'Untitled',
			date: post.frontmatter?.date,
			headings: post.headings
		})),
		...versionedPosts.map(post => ({
			url: `/v/${post.version}/${post.slug.join('/')}`,
			title: post.headings[0]?.title || 'Untitled',
			date: post.frontmatter?.date,
			headings: post.headings,
			version: post.version
		}))
	];

	return searchItems;
}
