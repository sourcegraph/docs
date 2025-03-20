import { MemoryI } from '@baseai/core';

const memoryDocs = (): MemoryI => ({
	name: 'memory-sg-docs-live',
	description: 'An AI memory storing all Sourcegraph docs.',
	git: {
		enabled: true,
		include: ['**/*.mdx'],
		gitignore: true,
		embeddedAt: '',
		deployedAt: 'ab6065ecc6c667a5b8c0ded35498a17659d34333'
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

// Old
// deployedAt: '5f3fec8530280d01a783aadcdeb0ccc3f9cd8b70',
