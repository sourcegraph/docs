import { Breadcrumbs } from '@/components/Breadcrumbs';
import MdxContent from '@/components/MdxContent';
import { PrevNextLinks } from '@/components/PrevNextLinks';
import { Prose } from '@/components/Prose';
import { TableOfContents } from '@/components/Toc';
import { getAllMdxFiles, getMdxFileBySlug } from '@/lib/mdx';
import { notFound } from 'next/navigation';

export const maxDuration = 300;

export const generateStaticParams = async () => {
	const posts = await getAllMdxFiles();
	return posts.map(post => ({
		slug: post.slug
	}));
};

export const generateMetadata = async (props: Props) => {
	const params = await props.params;
	const path = params.slug.join('/');
	const post = await getMdxFileBySlug(params.slug);

	if (post && post.headings && post.headings.length > 0) {
		return {
			title: post.headings[0].title,
			openGraph: {
				images: [
					{ url: 'https://sourcegraph.com/docs/sourcegraph-og-nw.png' }
				]
			}
		};
	}
};

interface Props {
	params: Promise<{
		slug: string[];
	}>;
}

const PostLayout = async (props: Props) => {
	const params = await props.params;
	const post = await getMdxFileBySlug(params.slug);

	if (!post) return notFound();

	return (
		<>
			<div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
				<Breadcrumbs path={params.slug} />
				<article>
					<Prose>
						<MdxContent source={post.source} />
					</Prose>
				</article>
				<PrevNextLinks />
			</div>
			{/* @ts-ignore */}
			<TableOfContents headings={post.headings} />
		</>
	);
};

export default PostLayout;
