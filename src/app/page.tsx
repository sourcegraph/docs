import MdxComponents from '@/components/MdxComponents';
import {Prose} from '@/components/Prose';
import {GoogleAnalytics} from '@next/third-parties/google';
import {allPosts} from 'contentlayer/generated';
import {getMDXComponent} from 'next-contentlayer/hooks';
import {notFound} from 'next/navigation';

export const generateMetadata = () => {
	const ogImageUrl = '/api/og/index';
	return {
		openGraph: {
			images: [{url: ogImageUrl, width: 1200, height: 630}]
		},
		twitter: {
			card: 'summary_large_image' as const,
			images: [{url: ogImageUrl, width: 1200, height: 630}]
		}
	};
};

const PostLayout = () => {
	const post = allPosts.find(post => post._raw.flattenedPath === '');
	if (!post) return notFound();
	const Content = getMDXComponent(post.body.code);

	return (
		<>
			<div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
				<article>
					<Prose suppressHydrationWarning>
						<Content components={MdxComponents()} />
					</Prose>
				</article>
			</div>
			<GoogleAnalytics gaId="GTM-TB4NLS7" />
		</>
	);
};

export default PostLayout;
