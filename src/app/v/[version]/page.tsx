import MdxComponents from '@/components/MdxComponents';
import {Prose} from '@/components/Prose';
import {allPosts} from 'contentlayer/generated';
import {getMDXComponent} from 'next-contentlayer/hooks';
import {notFound} from 'next/navigation';

interface Props {
	params: {
		version: string;
	};
}

const PostLayout = ({params}: Props) => {
	const post = allPosts.find(
		post => post._raw.flattenedPath === `versioned/${params.version}`
	);
	if (!post) return notFound();
	const Content = getMDXComponent(post.body.code);

	return (
		<>
			<div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
				<article>
					<Prose suppressHydrationWarning>
						<Content components={MdxComponents(params.version)} />
					</Prose>
				</article>
			</div>
		</>
	);
};

export default PostLayout;
