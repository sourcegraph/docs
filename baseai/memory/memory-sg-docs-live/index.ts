import { MemoryI } from '@baseai/core';

const memoryDocs = (): MemoryI => ({
	name: 'memory-sg-docs-live',
	description: 'An AI memory storing all Sourcegraph docs.',
	git: {
		enabled: true,
		include: ['**/*.mdx'],
		gitignore: true,
		embeddedAt: '',
		deployedAt: '1b67d5c14520a898e2b9933ab3d2a9fe28515e31'
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
