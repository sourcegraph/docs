import MdxContent from '@/components/MdxContent';
import { Prose } from '@/components/Prose';
import { getVersionedPostBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';

interface Props {
	params: Promise<{
		version: string;
	}>;
}

const PostLayout = async (props: Props) => {
	const params = await props.params;
	const post = await getVersionedPostBySlug(params.version, '');

	if (!post) return notFound();

	return (
		<>
			<div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
				<article>
					<Prose suppressHydrationWarning>
						<MdxContent source={post.source} version={params.version} />
					</Prose>
				</article>
			</div>
		</>
	);
};

export default PostLayout;
