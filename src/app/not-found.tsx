import {NotFoundLinks} from '@/components/NotFoundLinks';
import {allPosts} from 'contentlayer/generated';

// Preview pages 404 without ?preview, so they are not valid targets.
const pagePaths = allPosts.filter(post => !post.preview).map(post => post.url);

export default function NotFound() {
	return (
		<div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
			<div className="flex h-full flex-col items-center justify-center text-center">
				<p className="font-display text-sm font-medium text-slate-900 dark:text-white">
					404
				</p>
				<h1 className="mt-3 font-display text-3xl tracking-tight text-slate-900 dark:text-white">
					Page not found
				</h1>
				<p className="mt-2 text-sm text-slate-500 dark:text-dark-paragraph-text">
					Sorry, we couldn’t find the page you’re looking for.
				</p>
				<NotFoundLinks pagePaths={pagePaths} />
			</div>
		</div>
	);
}
