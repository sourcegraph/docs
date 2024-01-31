import Link from 'next/link';
import clsx from 'clsx';
import {ChevronRightIcon} from '@heroicons/react/20/solid';

export function Breadcrumbs({path}: {path: string[]}) {
	const createLink = ({path, index}: {path: string[]; index: number}) => {
		// For the first index, return the slug itself, otherwise return the joined path
		return index === 0
			? `/${encodeURIComponent(path[0])}`
			: `/${path
					.slice(0, index + 1)
					.map(encodeURIComponent)
					.join('/')}`;
	};

	return (
		<nav className="mb-8 flex" aria-label="Breadcrumb">
			<ol role="list" className="flex items-center space-x-4">
				<li>
					<div>
						<Link
							href="/"
							className="text-sm font-medium text-gray-500 hover:text-link-light dark:hover:text-link"
						>
							Docs
						</Link>
					</div>
				</li>
				{path.map((slug, index) => (
					<li key={slug}>
						<div className="flex items-center">
							<ChevronRightIcon
								className="h-5 w-5 flex-shrink-0 text-gray-400"
								aria-hidden="true"
							/>
							<Link
								href={createLink({path, index})}
								className={clsx(
									'ml-4 text-sm font-medium',
									index === path.length - 1
										? 'text-link-light hover:underline dark:text-link'
										: 'text-gray-500 hover:text-link-light dark:hover:text-link'
								)}
							>
								{slug}
							</Link>
						</div>
					</li>
				))}
			</ol>
		</nav>
	);
}
