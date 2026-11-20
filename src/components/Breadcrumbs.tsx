import Link from 'next/link';
import {ChevronRightIcon} from '@heroicons/react/20/solid';
import {allPosts} from 'contentlayer/generated';

const linkClassName =
	'text-sm font-medium text-gray-500 hover:text-link-light dark:text-gray-400 dark:hover:text-link';

// One crumb per path segment. A segment is linked only when a page exists at
// that path (many section directories have no index page), and is labelled
// with that page's first heading instead of its slug.
function crumbFor(path: string[], index: number) {
	const segments = path.slice(0, index + 1);
	const page = allPosts.find(
		post => post._raw.flattenedPath === segments.join('/')
	);
	const title: string | undefined = page?.headings?.[0]?.title;
	return {
		label: title ?? segments[index],
		href: page ? `/${segments.map(encodeURIComponent).join('/')}` : null
	};
}

export function Breadcrumbs({path}: {path: string[]}) {
	return (
		<nav className="mb-8 flex" aria-label="Breadcrumb">
			<ol role="list" className="flex items-center space-x-4">
				<li>
					<Link href="/" className={linkClassName}>
						Docs
					</Link>
				</li>
				{path.map((_, index) => {
					const {label, href} = crumbFor(path, index);
					const isCurrent = index === path.length - 1;
					return (
						<li key={index} className="flex items-center">
							<ChevronRightIcon
								className="h-5 w-5 flex-shrink-0 text-gray-400"
								aria-hidden="true"
							/>
							{isCurrent ? (
								<span
									aria-current="page"
									className="ml-4 text-sm font-medium text-gray-900 dark:text-white"
								>
									{label}
								</span>
							) : href ? (
								<Link
									href={href}
									className={`ml-4 ${linkClassName}`}
								>
									{label}
								</Link>
							) : (
								<span className="ml-4 text-sm font-medium text-gray-500 dark:text-gray-400">
									{label}
								</span>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
