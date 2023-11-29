import Link from 'next/link';
import clsx from 'clsx';
import {ChevronRightIcon} from '@heroicons/react/20/solid';

type BreadcrumbsProps = {
	topic: string;
	section?: string;
	subsection?: string;
	details?: string;
};

export function Breadcrumbs({
	topic,
	section,
	subsection,
	details
}: BreadcrumbsProps) {
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

				<li key={topic}>
					<div className="flex items-center">
						<ChevronRightIcon
							className="h-5 w-5 flex-shrink-0 text-gray-400"
							aria-hidden="true"
						/>
						<Link
							href={`/${topic}`}
							className={clsx(
								!section
									? 'text-link-light hover:underline dark:text-link'
									: 'hover:text-link dark:hover:text-link',
								'ml-4 text-sm font-medium text-gray-500'
							)}
						>
							{topic}
						</Link>
					</div>
				</li>

				{section && (
					<li key={section}>
						<div className="flex items-center">
							<ChevronRightIcon
								className="h-5 w-5 flex-shrink-0 text-gray-400"
								aria-hidden="true"
							/>
							<Link
								href={`/${topic}/${section}`}
								className={clsx(
									!subsection
										? 'text-link-light hover:underline dark:text-link'
										: 'hover:text-link-light dark:hover:text-link',
									'ml-4 text-sm font-medium text-gray-500'
								)}
							>
								{section}
							</Link>
						</div>
					</li>
				)}

				{subsection && (
					<li key={subsection}>
						<div className="flex items-center">
							<ChevronRightIcon
								className="h-5 w-5 flex-shrink-0 text-gray-400"
								aria-hidden="true"
							/>
							<Link
								href={`/docs/${topic}/${section}/${subsection}`}
								className={clsx(
									!details
										? 'text-link-light hover:underline dark:text-link'
										: 'hover:text-link-light dark:hover:text-link',
									'ml-4 text-sm font-medium text-gray-500'
								)}
							>
								{subsection}
							</Link>
						</div>
					</li>
				)}

				{details && (
					<li key={details}>
						<div className="flex items-center">
							<ChevronRightIcon
								className="h-5 w-5 flex-shrink-0 text-gray-400"
								aria-hidden="true"
							/>
							<Link
								href={`/docs/${topic}/${section}/${subsection}/${details}`}
								className="ml-4 text-sm font-medium text-link-light hover:underline dark:text-link"
							>
								{details}
							</Link>
						</div>
					</li>
				)}
			</ol>
		</nav>
	);
}
