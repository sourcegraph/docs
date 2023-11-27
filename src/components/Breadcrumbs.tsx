import Link from 'next/link';
import clsx from 'clsx';
import {ChevronRightIcon} from '@heroicons/react/20/solid';

type BreadcrumbsProps = {
	topic: string;
	section?: string;
	subsection?: string;
};

export function Breadcrumbs({topic, section, subsection}: BreadcrumbsProps) {
	return (
		<nav className="mb-8 flex" aria-label="Breadcrumb">
			<ol role="list" className="flex items-center space-x-4">
				<li>
					<div>
						<Link
							href="/"
							className="text-gray-500 dark:hover:text-link hover:text-link-light text-sm font-medium"
						>
							Docs
						</Link>
					</div>
				</li>

				<li key={topic}>
					<div className="flex items-center">
						<ChevronRightIcon
							className="text-gray-400 h-5 w-5 flex-shrink-0"
							aria-hidden="true"
						/>
						<Link
							href={`/${topic}`}
							className={clsx(
								!section
									? 'dark:text-link text-link-light hover:underline'
									: 'dark:hover:text-link hover:text-link',
								'text-gray-500 ml-4 text-sm font-medium'
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
								className="text-gray-400 h-5 w-5 flex-shrink-0"
								aria-hidden="true"
							/>
							<Link
								href={`/${topic}/${section}`}
								className={clsx(
									!subsection
										? 'dark:text-link text-link-light hover:underline'
										: 'dark:hover:text-link hover:text-link-light',
									'text-gray-500 ml-4 text-sm font-medium'
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
								className="text-gray-400 h-5 w-5 flex-shrink-0"
								aria-hidden="true"
							/>
							<Link
								href={`/docs/${topic}/${section}/${subsection}`}
								className="dark:text-link text-link-light ml-4 text-sm font-medium hover:underline"
							>
								{subsection}
							</Link>
						</div>
					</li>
				)}
			</ol>
		</nav>
	);
}
