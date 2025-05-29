import clsx from 'clsx';
import Link from 'next/link';
import {usePathname, useParams} from 'next/navigation';
import {NavigationItem, versionNavigations, navigation as defaultNavigation} from '@/data/navigation';
import {ChevronRightIcon} from '@heroicons/react/20/solid';
import {useEffect, useState, Fragment, useMemo, useCallback} from 'react';

interface NavigationProps {
	className?: string;
	onLinkClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export function Navigation({className, onLinkClick}: NavigationProps) {
	const pathname = usePathname();
	const params = useParams();
	const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
	const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

	// Memoize the current navigation to avoid recalculation
	const currentNavigation = useMemo(() => {
		return versionNavigations[params.version as string] || versionNavigations['navigation'] || defaultNavigation;
	}, [params.version]);

	// Memoize version extraction logic
	const version = useMemo(() => {
		const segments = pathname.split('/');
		const versionIndex = segments.findIndex(segment => segment === 'v');
		return versionIndex >= 0 && segments[versionIndex + 1] ? segments[versionIndex + 1] : null;
	}, [pathname]);

	// Prepends version (if any) to the link path
	const prependVersion = useCallback((path: string) => {
		return version ? `/v/${version}${path}` : path;
	}, [version]);

	// Optimized expansion logic
	const handleTopicClick = useCallback((topicTitle: string, maximize?: boolean) => {
		setExpandedTopics(prev => {
			const newSet = new Set(prev);
			if (newSet.has(topicTitle)) {
				newSet.delete(topicTitle);
			} else {
				if (!maximize) {
					// If not maximizing, collapse other topics
					newSet.clear();
				}
				newSet.add(topicTitle);
			}
			return newSet;
		});
	}, []);

	const handleSectionClick = useCallback((sectionTitle: string, maximize?: boolean) => {
		setExpandedSections(prev => {
			const newSet = new Set(prev);
			if (newSet.has(sectionTitle)) {
				newSet.delete(sectionTitle);
			} else {
				if (!maximize) {
					newSet.clear();
				}
				newSet.add(sectionTitle);
			}
			return newSet;
		});
	}, []);

	// Initialize expanded state based on current path
	useEffect(() => {
		const newExpandedTopics = new Set<string>();
		const newExpandedSections = new Set<string>();

		for (const separator of currentNavigation) {
			for (const topic of separator.topics) {
				if (topic.href === pathname) {
					newExpandedTopics.add(separator.separator);
					newExpandedTopics.add(topic.title);
					return;
				}
				for (const section of topic.sections || []) {
					if (section.href === pathname) {
						newExpandedTopics.add(separator.separator);
						newExpandedTopics.add(topic.title);
						newExpandedSections.add(section.title);
						return;
					}
					for (const subsection of section.subsections || []) {
						if (subsection.href === pathname) {
							newExpandedTopics.add(separator.separator);
							newExpandedTopics.add(topic.title);
							newExpandedSections.add(section.title);
							return;
						}
					}
				}
			}
		}

		setExpandedTopics(newExpandedTopics);
		setExpandedSections(newExpandedSections);
	}, [pathname, currentNavigation]);

	return (
		<nav className={clsx('text-base lg:text-sm', className)}>
			<ul role="list" className="space-y-9">
				{currentNavigation.map(separator => (
					<li key={separator.separator}>
						<h2 className="mb-8 font-semibold tracking-wide text-slate-900 dark:text-dark-text-primary lg:mb-3">
							{separator.separator}
						</h2>
						<ul role="list" className="mt-2 space-y-2 lg:mt-4 lg:space-y-4">
							{separator.topics.map(topic => (
								<li key={topic.title} className="relative">
									<div className="flex w-full items-center justify-between">
										<Link
											href={prependVersion(topic.href)}
											onClick={(e) => {
												onLinkClick?.(e);
												handleTopicClick(topic.title);
											}}
											className={clsx(
												'flex w-full transition-colors',
												topic.href === pathname
													? 'font-semibold text-link-light before:bg-link-light dark:text-link dark:before:bg-link'
													: 'text-slate-500 hover:text-slate-900 dark:text-dark-text-secondary dark:hover:text-slate-100'
											)}
										>
											{topic.title}
										</Link>
										{topic.sections && (
											<button
												className="pointer-cursor rounded-md p-1 hover:bg-slate-200 dark:hover:bg-slate-800"
												onClick={() => handleTopicClick(topic.title, true)}
											>
												<ChevronRightIcon
													className={clsx(
														'pointer-cursor duration-400 h-4 w-4 text-slate-500 transition-transform dark:text-dark-text-secondary',
														{
															'rotate-90 transform': expandedTopics.has(topic.title)
														}
													)}
												/>
											</button>
										)}
									</div>
									{topic.sections && expandedTopics.has(topic.title) && (
										<ul className="my-4 space-y-2 border-l-2 border-slate-100 dark:border-slate-800 lg:border-slate-200">
											{topic.sections.map(section => (
												<Fragment key={section.title}>
													<li className="relative">
														<div className="flex w-full items-center justify-between">
															<Link
																href={prependVersion(section.href)}
																onClick={(e) => {
																	onLinkClick?.(e);
																	handleSectionClick(section.title, true);
																}}
																className={clsx(
																	'flex w-full items-center py-0.5 pl-3.5 transition-colors before:pointer-events-none before:absolute before:-left-0.5 before:h-full before:w-[2px]',
																	section.href === pathname
																		? 'font-semibold text-link-light before:bg-link-light dark:text-link dark:before:bg-link'
																		: 'text-slate-500 before:hidden before:bg-slate-900 hover:text-slate-900 hover:before:block dark:text-dark-text-secondary dark:before:bg-slate-100 dark:hover:text-slate-100'
																)}
															>
																{section.title}
															</Link>
															{section.subsections && (
																<button
																	className="pointer-cursor rounded-md p-1 hover:bg-slate-200 dark:hover:bg-slate-800"
																	onClick={() => handleSectionClick(section.title)}
																>
																	<ChevronRightIcon
																		className={clsx(
																			'pointer-cursor duration-400 h-4 w-4 text-slate-500 transition-transform dark:text-dark-text-secondary',
																			{
																				'rotate-90 transform': expandedSections.has(section.title)
																			}
																		)}
																	/>
																</button>
															)}
														</div>
													</li>
													{section.subsections && expandedSections.has(section.title) && (
														<ul className="my-4 ml-4 space-y-2 border-l-2 border-slate-100 dark:border-slate-800 lg:border-slate-200">
															{section.subsections.map(subsection => (
																<li key={subsection.title} className="relative">
																	<Link
																		href={prependVersion(subsection.href)}
																		onClick={(e) => {
																			onLinkClick?.(e);
																		}}
																		className={clsx(
																			'flex items-center py-0.5 pl-3.5 transition-colors before:pointer-events-none before:absolute before:-left-0.5 before:h-full before:w-[2px]',
																			subsection.href === pathname
																				? 'font-semibold text-link-light before:bg-link-light dark:text-link dark:before:bg-link'
																				: 'text-slate-500 before:hidden before:bg-slate-900 hover:text-slate-900 hover:before:block dark:text-dark-text-secondary dark:before:bg-slate-100 dark:hover:text-slate-100'
																		)}
																	>
																		{subsection.title}
																	</Link>
																</li>
															))}
														</ul>
													)}
												</Fragment>
											))}
										</ul>
									)}
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>
		</nav>
	);
}
