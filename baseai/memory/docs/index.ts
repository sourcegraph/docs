import { MemoryI } from '@baseai/core';

const memoryDocs = (): MemoryI => ({
	name: 'docs',
	description: 'Docs folder of sourcegraph docs repository as an auto-synced memory',
	git: {
		enabled: true,
		include: ['**/*.mdx'],
		gitignore: true,
		deployedAt: '39f2778ad2dce348bb762a85f765c21453cec4fe',
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
