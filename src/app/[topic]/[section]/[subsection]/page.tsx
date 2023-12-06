import {format, parseISO} from 'date-fns';
import {allPosts} from 'contentlayer/generated';
import {getMDXComponent} from 'next-contentlayer/hooks';
import {Prose} from '@/components/Prose';
import {DocsLayout} from '@/components/DocsLayout';
import {PrevNextLinks} from '@/components/PrevNextLinks';
import {Breadcrumbs} from '@/components/Breadcrumbs';
import {QuickLink, QuickLinks} from '@/components/QuickLinks';
import MdxComponents from '@/components/MdxComponents';
import {notFound} from 'next/navigation';
import {TableOfContents} from '@/components/TableofContents';

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
		subsection: string;
	};
}

const PostLayout = ({params}: Props) => {
	const post = allPosts.find(
		post =>
			post._raw.flattenedPath ===
			`${params.topic}/${params.section}/${[params.subsection]}`
	);
	if (!post) return notFound();
	const Content = getMDXComponent(post.body.code);

	return (
		<>
			<div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
				<Breadcrumbs
					topic={params.topic}
					section={params.section}
					subsection={params.subsection}
				/>
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
