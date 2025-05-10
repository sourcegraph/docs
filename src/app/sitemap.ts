import { MetadataRoute } from 'next';
import { getAllMdxFiles } from '@/lib/mdx';

const baseUrl = 'https://sourcegraph.com/docs';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const links = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
  ];

  const posts = await getAllMdxFiles();

  posts.forEach(post => {
    links.push({
      url: `${baseUrl}/${post.slug.join('/')}`,
      lastModified: post.frontmatter?.date ? new Date(post.frontmatter.date) : new Date()
    });
  });

  return links;
}