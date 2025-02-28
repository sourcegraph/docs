import { MemoryI } from '@baseai/core';

const memoryDocs = (): MemoryI => ({
	name: 'docs',
	description: 'Docs folder of sourcegraph docs repository as an auto-synced memory',
	git: {
		enabled: true,
		include: ['**/*.mdx'],
		gitignore: true,
		deployedAt: 'dd4e4714696856a7160aded10308b08304ca3739',
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
