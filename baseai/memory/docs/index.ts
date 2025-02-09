import { MemoryI } from '@baseai/core';

const memoryDocs = (): MemoryI => ({
	name: 'docs',
	description: 'Docs folder of sourcegraph docs repository as an auto-synced memory',
	git: {
		enabled: true,
		include: ['**/*.mdx'],
		gitignore: true,
		deployedAt: '',
		embeddedAt: '',
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
