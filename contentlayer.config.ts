import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import fs from 'fs';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import slugify from '@sindresorhus/slugify'

export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: `**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: false },
        date: { type: 'date', required: false },
    },
    computedFields: {
        url: { type: 'string', resolve: (post) => `/${post._raw.flattenedPath}` },
        headings: {
            type: "json",
            resolve: async (doc) => {
                const regXHeader = /^ *(?<flag>#{1,6})\s+(?<content>.+)/gm;
                const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
                    ({ groups }) => {
                        const flag = groups?.flag;
                        // Handle headings with links eg:
                        // Converts '[Getting started](/getting-started)' to 'Getting started'
                        const match = groups?.content?.match(/\[([^\]]+)\]\([^)]+\)/);
                        const title = match ? match[1] : groups?.content;
                        return {
                            level: flag?.length,
                            title: title,
                            id: title ? slugify(title) : undefined
                        };
                    }
                );
                return headings;
            },
        }
    },
}))

const prettyCodeOptions = {
    keepBackground: true,
    theme: JSON.parse(
        fs.readFileSync(
            new URL('./../../../src/styles/shades-of-purple.json', import.meta.url),
            'utf-8'
        )
    ),
}

export default makeSource({
    contentDirPath: 'docs', documentTypes: [Post], mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, prettyCodeOptions], rehypeSlug, [rehypeAutolinkHeadings]],
    },
})
