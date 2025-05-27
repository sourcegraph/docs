import { Breadcrumbs } from '@/components/Breadcrumbs';
import MdxContent from '@/components/MdxContent';
import { PrevNextLinks } from '@/components/PrevNextLinks';
import { Prose } from '@/components/Prose';
import { TableOfContents } from '@/components/Toc';
import { getAllVersionedPosts, getVersionedPostBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';

export const maxDuration = 300;

export const generateStaticParams = async () => {
	const versions = ['6.3']; // Add your versions here
	const allParams = [];

	for (const version of versions) {
		const posts = await getAllVersionedPosts(version);
		if (posts) {
			const params = posts.map(post => ({
				version,
				slug: post.slugPath.split('/')
			}));
			allParams.push(...params);
		}
	}

	return allParams;
};

export const generateMetadata = async (props: Props) => {
	const params = await props.params;
	const slugPath = params.slug.join('/');
	const post = await getVersionedPostBySlug(params.version, slugPath);

	if (post && post.headings && post.headings.length > 0) {
		return { title: post.headings[0].title };
	}
};

interface Props {
	params: Promise<{
		version: string;
		slug: string[];
	}>;
}

const PostLayout = async (props: Props) => {
	const params = await props.params;
	const slugPath = params.slug.join('/');
	const post = await getVersionedPostBySlug(params.version, slugPath);

	if (!post) return notFound();

	return (
		<>
			<div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
				<Breadcrumbs path={params.slug} />
				<article>
					<Prose>
						<MdxContent source={post.source} version={params.version} />
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
