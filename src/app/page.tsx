import { GoogleAnalytics } from '@next/third-parties/google';
import MdxContent from '@/components/MdxContent';
import { Prose } from '@/components/Prose';
import { getMdxFileBySlug } from '@/lib/mdx';
import { notFound } from 'next/navigation';

export const generateMetadata = () => {
	return {
		openGraph: {
			images: [
				{ url: 'https://sourcegraph.com/docs/sourcegraph-og-nw.png' }
			]
		}
	};
};

const PostLayout = async () => {
	const post = await getMdxFileBySlug([]);
	if (!post) return notFound();

	return (
		<>
			<div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
				<article>
					<Prose suppressHydrationWarning>
						<MdxContent source={post.source} />
					</Prose>
				</article>
			</div>
			<GoogleAnalytics gaId="GTM-TB4NLS7" />
		</>
	);
};

export default PostLayout;
