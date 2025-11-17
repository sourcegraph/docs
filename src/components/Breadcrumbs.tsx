'use client';

import Link from 'next/link';
import clsx from 'clsx';
import {ChevronRightIcon} from '@heroicons/react/20/solid';
import {useEffect, useState} from 'react';
import {usePathname} from 'next/navigation';
import {navigation} from '@/data/navigation';
import {allPosts} from 'contentlayer/generated';

export function Breadcrumbs({path}: {path: string[]}) {
	let pathname = usePathname();
	const [version, setVersion] = useState<string | null>(null);

	const createLink = ({path, index}: {path: string[]; index: number}) => {
		let linkPath = `/${path
			.slice(0, index + 1)
			.map(encodeURIComponent)
			.join('/')}`;
		return prependVersion(linkPath);
	};

	// Prepends version (if any) to the link path
	const prependVersion = (path: string) => {
		return version ? `/v/${version}${path}` : path;
	};

	const getTitleForSlug = (currentPath: string[]): string => {
		const href = `/${currentPath.join('/')}`;

		for (const navItem of navigation) {
			for (const topic of navItem.topics) {
				if (topic.href === href) return topic.title;

				if (topic.sections) {
					for (const section of topic.sections) {
						if (section.href === href) return section.title;

						if (section.subsections) {
							for (const subsection of section.subsections) {
								if (subsection.href === href) return subsection.title;
							}
						}
					}
				}
			}
		}

		const pagePath = currentPath.join('/');
		const post = allPosts.find(post => post._raw.flattenedPath === pagePath);
		if (post && post.headings && post.headings.length > 0) {
			return post.headings[0].title;
		}

		throw new Error(`No title found in navigation.ts or page headings for path: ${href}`);
	};

	// Handle versions
	useEffect(() => {
		// Extract the version name from the URL path, if any
		const segments = pathname.split('/');
		const versionIndex = segments.findIndex(segment => segment === 'v');
		// Versioned link example:
		// docs/v/5.1.2/ where versionName = 5.1.2
		const versionName = versionIndex >= 0 && segments[versionIndex + 1];
		if (!versionName) {
			setVersion(null);
			return;
		}
		setVersion(versionName);
	}, [pathname]);

	return (
		<nav className="mb-8 flex" aria-label="Breadcrumb">
			<ol role="list" className="flex items-center space-x-4">
				<li>
					<div>
						<Link
							href={prependVersion('/')}
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
								{getTitleForSlug(path.slice(0, index + 1))}
							</Link>
						</div>
					</li>
				))}
			</ol>
		</nav>
	);
}
