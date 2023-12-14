import { Breadcrumbs } from '@/app/components/Breadcrumbs';
import MdxComponents from '@/app/components/MdxComponents';
import { PrevNextLinks } from '@/app/components/PrevNextLinks';
import { Prose } from '@/app/components/Prose';
import { TableOfContents } from '@/app/components/Toc';
import { allPosts } from 'contentlayer/generated';
import { getMDXComponent } from 'next-contentlayer/hooks';
import { notFound } from 'next/navigation';

export const generateStaticParams = async () =>
	allPosts.map(post => {
		({ slug: post._raw.flattenedPath });
	});

export const generateMetadata = ({ params }: Props) => {
	const currentUrl =
		`${params.topic}/${params.section}/${params.subsection}/${params.details}/${params.subdetails}`.trim();
	const post = allPosts.find(post => post._raw.flattenedPath === currentUrl);
	if (post && post.headings && post.headings.length > 0) {
		return { title: post.headings[0].title };
	}
};

interface Props {
	params: {
		topic: string;
		section: string;
		subsection: string;
		details: string;
		subdetails: string;
	};
}

const PostLayout = ({ params }: Props) => {
	const currentUrl =
		`${params.topic}/${params.section}/${params.subsection}/${params.details}/${params.subdetails}`.trim();
	const post = allPosts.find(post => post._raw.flattenedPath === currentUrl);

	if (!post) return notFound();
	const Content = getMDXComponent(post.body.code);

	return (
		<>
			<div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
				<Breadcrumbs
					topic={params.topic}
					section={params.section}
					subsection={params.subsection}
					details={params.details}
					subdetails={params.subdetails}
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
