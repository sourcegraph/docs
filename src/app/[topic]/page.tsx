import {Breadcrumbs} from '@/components/Breadcrumbs';
import MdxComponents from '@/components/MdxComponents';
import {PrevNextLinks} from '@/components/PrevNextLinks';
import {Prose} from '@/components/Prose';
import {TableOfContents} from '@/components/Toc';
import {allPosts} from 'contentlayer/generated';
import {getMDXComponent} from 'next-contentlayer/hooks';
import {notFound} from 'next/navigation';

export const generateStaticParams = async () =>
	allPosts.map(post => {
		({slug: post._raw.flattenedPath});
	});

export const generateMetadata = ({params}: Props) => {
	const post = allPosts.find(
		post => post._raw.flattenedPath === params.topic
	);
	if (post && post.headings && post.headings.length > 0) {
		return {title: post.headings[0].title};
	}
};

interface Props {
	params: {
		topic: string;
	};
}

const PostLayout = ({params}: Props) => {
	const post = allPosts.find(
		post => post._raw.flattenedPath === params.topic
	);
	if (!post) return notFound();
	const Content = getMDXComponent(post.body.code);

	return (
		<>
			<div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
				<Breadcrumbs topic={params.topic} />
				<article>
					<Prose>
						<Content components={MdxComponents} />
					</Prose>
				</article>
				<PrevNextLinks />
			</div>
			<TableOfContents headings={post.headings} />
		</>
	);
};

export default PostLayout;
