import {format, parseISO} from 'date-fns';
import {allPosts} from 'contentlayer/generated';
import {getMDXComponent} from 'next-contentlayer/hooks';
import {Prose} from '@/components/Prose';
import {DocsLayout} from '@/components/DocsLayout';
import {DocsHeader} from '@/components/DocsHeader';
import {PrevNextLinks} from '@/components/PrevNextLinks';
import {TableOfContents} from '@/components/TableOfContents';
import {Breadcrumbs} from '@/components/Breadcrumbs';
import {QuickLink, QuickLinks} from '@/components/QuickLinks';
import MdxComponents from '@/components/MdxComponents';
import {notFound} from 'next/navigation';

export const generateStaticParams = async () =>
	allPosts.map(post => {
		({slug: post._raw.flattenedPath});
	});

// export const generateMetadata = ({params}) => {
// 	const post = allPosts.find(post => post._raw.flattenedPath === params.slug);
// 	return {title: post.title ? post.title : 'no title'};
// };

interface Props {
	params: {
		topic: string;
		section: string;
	};
}

const PostLayout = ({params}: Props) => {
	const post = allPosts.find(
		post => post._raw.flattenedPath === `${params.topic}/${params.section}`
	);
	if (!post) return notFound();
	const Content = getMDXComponent(post.body.code);

	return (
		<>
			<div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
				<Breadcrumbs topic={params.topic} section={params.section} />
				<article>
					{/* <DocsHeader title={'Cody Custom Commands'} /> */}
					<Prose>
						<Content components={MdxComponents} />
						{/* <div
							className="[&>*:last-child]:mb-0 [&>*]:mb-3"
							dangerouslySetInnerHTML={{__html: post.body.html}}
						/> */}
					</Prose>
				</article>
				<PrevNextLinks />
			</div>
		</>
	);
};

export default PostLayout;
