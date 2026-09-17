import MdxComponents from '@/components/MdxComponents';
import {Prose} from '@/components/Prose';
import {allPosts} from 'contentlayer/generated';
import {getMDXComponent} from 'next-contentlayer2/hooks';
import {ArrowRight} from 'lucide-react';
import Link from 'next/link';
import {notFound} from 'next/navigation';

export const generateMetadata = () => {
	const ogImageUrl = `${process.env.NEXT_PUBLIC_DOCS_BASE_PATH || ''}/api/og/index`;
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

// Keep the landing-page cards compact without changing cards in the guides.
function HomeQuickLink({
	title,
	description,
	href
}: {
	title: string;
	description: string;
	href: string;
}) {
	return (
		<Link
			href={href}
			className="rounded-xl border border-light-border-2 p-5 transition-colors hover:border-vermilion-07 hover:bg-light-bg-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vermilion-07 dark:border-dark-border dark:hover:border-vermilion-08 dark:hover:bg-dark-bg-1"
		>
			<div className="flex items-start justify-between gap-4">
				<h2 className="font-display text-lg leading-6 text-slate-900 dark:text-white">
					{title}
				</h2>
				<ArrowRight
					aria-hidden="true"
					className="mt-1 h-4 w-4 shrink-0 text-vermilion-07 dark:text-vermilion-08"
				/>
			</div>
			<p className="mt-2 text-sm text-slate-700 dark:text-dark-text-secondary">
				{description}
			</p>
		</Link>
	);
}

const PostLayout = () => {
	const post = allPosts.find(post => post._raw.flattenedPath === '');
	if (!post) return notFound();
	const Content = getMDXComponent(post.body.code);

	return (
		<>
			<main className="min-w-0 max-w-2xl flex-auto px-4 py-10 lg:max-w-none lg:py-16 lg:pl-8 lg:pr-0 xl:px-16">
				<article>
					<Prose
						className="prose-h1:mb-3 prose-h1:text-3xl prose-h1:tracking-tight prose-h2:text-xl"
						suppressHydrationWarning
					>
						<Content
							components={{
								...MdxComponents(),
								QuickLinks: ({
									children
								}: {
									children: React.ReactNode;
								}) => (
									<div
										id="quickstart"
										className="not-prose my-8 grid scroll-mt-28 grid-cols-1 gap-4 sm:grid-cols-2"
									>
										{children}
									</div>
								),
								QuickLink: HomeQuickLink
							}}
						/>
					</Prose>
				</article>
			</main>
		</>
	);
};

export default PostLayout;
