import {MemoryI} from '@baseai/core';
const memoryForum = (): MemoryI => ({
	name: 'community-forum',
	description:
		'Solved questions and answers from the Sourcegraph community forum',
	documents: {
		meta: doc => {
			// For a single JSON file containing all topics
			// We'll extract metadata from the content
			try {
				// The content might be a JSON string with all topics
				const topics = JSON.parse(doc.content);

				// Return basic metadata about this collection
				// Convert count to string to satisfy the Record<string, string> type
				return {
					url: 'https://community.sourcegraph.com/',
					name: 'Sourcegraph Community Forum - Solved Topics',
					count: String(topics.length) // Convert to string
				};
			} catch (e) {
				// If parsing fails, return basic info
				// Add count property with a default value to match the structure
				return {
					url: 'https://community.sourcegraph.com/',
					name: doc.name,
					count: '0'
				};
			}
		}
	},
	// Track the single JSON file
	git: {
		enabled: true,
		include: ['baseai/memory/community-forum/data/forum-topics.json'],
		gitignore: true,
		deployedAt: '',
		embeddedAt: ''
	}
});

export default memoryForum;
