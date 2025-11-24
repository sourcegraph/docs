import {defineDocumentType, makeSource} from 'contentlayer/source-files';
import fs from 'fs';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import {MDXDocument, allCoreContent} from './src/utils/contentlayer';
import {searchMetadata} from './src/data/search';
import GithubSlugger from 'github-slugger';
import {visit} from 'unist-util-visit';

export const Post = defineDocumentType(() => ({
	name: 'Post',
	filePathPattern: `**/*.mdx`,
	contentType: 'mdx',
	fields: {
		title: {type: 'string', required: false},
		date: {type: 'date', required: false}
	},
	computedFields: {
		url: {type: 'string', resolve: post => `/${post._raw.flattenedPath}`},
		headings: {
			type: 'json',
			resolve: async doc => {
				const regXHeader = /^ *(?<flag>#{1,6})\s+(?<content>.+)/gm;
				const regXCodeBlock = /```[\s\S]*?```/g;
				const slugger = new GithubSlugger();

				// Ignore content within code blocks – No headings there
				const bodyWithoutCodeBlocks = doc.body.raw.replace(
					regXCodeBlock,
					''
				);

				const headings = Array.from(
					bodyWithoutCodeBlocks.matchAll(regXHeader)
				).map(({groups}) => {
					const flag = groups?.flag;
					// Handles headings with links eg:
					// Converts '##[Getting started](/getting-started)' to 'Getting started'
					const match = groups?.content?.match(
						/\[([^\]]+)\]\([^)]+\)/
					);
					const title = match ? match[1] : groups?.content;
					return {
						level: flag?.length,
						title: title,
						id: title ? slugger.slug(title) : undefined
					};
				});
				return headings;
			}
		}
	}
}));

function createSearchIndex(allPosts: MDXDocument[]) {
	if (
		searchMetadata?.provider === 'kbar' &&
		searchMetadata.kbarConfig.searchDocumentsPath
	) {
		fs.writeFileSync(
			`public/search.json`,
			JSON.stringify(allCoreContent(allPosts))
		);
		console.log('Search index generated...');
	}
}

const prettyCodeOptions = {
	keepBackground: true,
	theme: JSON.parse(
		fs.readFileSync(
			new URL(
				'./../../../src/styles/shades-of-purple.json',
				import.meta.url
			),
			'utf-8'
		)
	)
};

const rehypePlugins: any = [
	// Extract raw code content from code elements within pre elements
	() => (tree: any) => {
		visit(tree, (node: any) => {
			if (node?.type === 'element' && node?.tagName === 'pre') {
				const [codeEl] = node.children;
				if (codeEl.tagName !== 'code') return;

				node.raw = codeEl.children?.[0].value;
			}
		});
	},
	[rehypePrettyCode, prettyCodeOptions],
	// Add raw code content as a property to pre elements within div elements containing data-rehype-pretty-code-fragment attribute
	() => (tree: any) => {
		visit(tree, (node: any) => {
			if (node?.type === 'element' && node?.tagName === 'div') {
				if (!('data-rehype-pretty-code-fragment' in node.properties))
					return;

				for (const child of node.children)
					if (child.tagName === 'pre')
						child.properties['raw'] = node.raw;
			}
		});
	},
	rehypeSlug,
	[rehypeAutolinkHeadings]
];

export default makeSource({
	contentDirPath: 'docs',
	documentTypes: [Post],
	mdx: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: rehypePlugins
	},
	onSuccess: async importData => {
		const {allPosts} = await importData();
		createSearchIndex(allPosts);
	}
});
