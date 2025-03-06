import { MemoryI } from '@baseai/core';

const memoryDocs = (): MemoryI => ({
	name: 'docs',
	description: 'Docs folder of sourcegraph docs repository as an auto-synced memory',
	git: {
		enabled: true,
		include: ['**/*.mdx'],
		gitignore: true,
		deployedAt: '5f3fec8530280d01a783aadcdeb0ccc3f9cd8b70',
		embeddedAt: ''
	},
	documents: {
		meta: doc => {
			const url = `https://sourcegraph.com/docs/${doc.path}`;
			return {
				url,
				name: doc.name,
			};
		},
	},
});

export default memoryDocs;
