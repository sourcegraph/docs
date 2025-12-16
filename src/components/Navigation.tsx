import clsx from 'clsx';
import Link from 'next/link';
import {usePathname, useParams} from 'next/navigation';

import {navigation, NavigationItem} from '@/data/navigation';
import {ChevronRightIcon} from '@heroicons/react/20/solid';
import {useEffect, useState} from 'react';

export function Navigation({
	className,
	onLinkClick
}: {
	className?: string;
	onLinkClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
	let pathname = usePathname();
	const params = useParams();

	const [version, setVersion] = useState<string | null>(null);
	const [expandedTopics, setExpandedTopics] = useState<string[]>([]);
	const [expandedSections, setExpandedSections] = useState<string[]>([]);
	const [expandUsingPath, setExpandUsingPath] = useState<boolean>(true);

	const handleTopicClick = (topicTitle: string, maximize?: boolean) => {
		setExpandedTopics(prevExpandedTopics => {
			if (prevExpandedTopics.includes(topicTitle)) {
				// Topic is expanded, collapse it
				return prevExpandedTopics.filter(title => title !== topicTitle);
			} else {
				// If maximize button clicked, expand but do not collapse other topics
				if (maximize) {
					return [...prevExpandedTopics, topicTitle];
				} else {
					// If topic opened, collapse other topics
					return [topicTitle];
				}
			}
		});
	};
	const handleSectionClick = (sectionTitle: string, maximize?: boolean) => {
		setExpandedSections(prevExpandedSections => {
			if (prevExpandedSections.includes(sectionTitle)) {
				return prevExpandedSections.filter(
					title => title !== sectionTitle
				);
			} else {
				if (maximize) {
					return [...prevExpandedSections, sectionTitle];
				} else {
					return [sectionTitle];
				}
			}
		});
	};
	// Expand topics and sections using path on the first page load
	useEffect(() => {
		if (expandUsingPath) {
			const updateExpansion = (items: NavigationItem[]) => {
				for (const separator of items) {
					for (const topic of separator.topics) {
						if (topic.href === pathname) {
							setExpandedTopics([separator.separator]);
							setExpandedSections([topic.title]);
							return;
						}
						for (const section of topic.sections || []) {
							if (section.href === pathname) {
								setExpandedTopics([
									separator.separator,
									topic.title
								]);
								setExpandedSections([section.title]);
								return;
							}
							for (const subsection of section.subsections ||
								[]) {
								if (subsection.href === pathname) {
									setExpandedTopics([
										separator.separator,
										topic.title
									]);
									setExpandedSections([section.title]);
									return;
								}
							}
						}
					}
				}
			};

			updateExpansion(navigation);
			setExpandUsingPath(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Prepends version (if any) to the link path
	const prependVersion = (path: string) => {
		return version ? `/v/${version}${path}` : path;
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
		<nav className={clsx('text-base lg:text-sm', className)}>
			<ul role="list" className="space-y-9">
				{navigation.map(separator => (
					<li key={separator.separator}>
						<h2 className="mb-8 font-semibold tracking-wide text-slate-900 dark:text-dark-text-primary lg:mb-3">
							{separator.separator}
						</h2>
						<ul
							role="list"
							className="mt-2 space-y-2 lg:mt-4 lg:space-y-4"
						>
							{separator.topics.map(topic => (
								<li key={topic.title} className="relative">
									<div className="flex w-full items-center justify-between">
										<Link
											href={prependVersion(topic.href)}
											onClick={() => {
												onLinkClick;
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
												onClick={() =>
													handleTopicClick(
														topic.title,
														true
													)
												}
											>
												<ChevronRightIcon
													className={clsx(
														'pointer-cursor duration-400 h-4 w-4 text-slate-500 transition-transform dark:text-dark-text-secondary',
														{
															'rotate-90 transform':
																expandedTopics.includes(
																	topic.title
																)
														}
													)}
												/>
											</button>
										)}
									</div>
									{topic.sections &&
										expandedTopics.includes(
											topic.title
										) && (
											<ul className="my-4 space-y-2 border-l-2 border-slate-100 dark:border-slate-800  lg:border-slate-200">
												{topic.sections.map(section => (
													<>
														<li
															key={section.title}
															className="relative"
														>
															<div className="flex w-full items-center justify-between">
																<Link
																	href={prependVersion(
																		section.href
																	)}
																	onClick={() => {
																		onLinkClick;
																		handleSectionClick(
																			section.title,
																			true
																		);
																	}}
																	className={clsx(
																		'flex w-full items-center py-0.5 pl-3.5 transition-colors before:pointer-events-none before:absolute before:-left-0.5 before:h-full before:w-[2px]',
																		section.href ===
																			pathname
																			? 'font-semibold text-link-light before:bg-link-light dark:text-link dark:before:bg-link'
																			: 'text-slate-500 before:hidden before:bg-slate-900 hover:text-slate-900 hover:before:block dark:text-dark-text-secondary dark:before:bg-slate-100 dark:hover:text-slate-100'
																	)}
																>
																	{
																		section.title
																	}
																</Link>
																{section.subsections && (
																	<button
																		className="pointer-cursor rounded-md p-1 hover:bg-slate-200 dark:hover:bg-slate-800"
																		onClick={() =>
																			handleSectionClick(
																				section.title
																			)
																		}
																	>
																		<ChevronRightIcon
																			className={clsx(
																				'pointer-cursor duration-400 h-4 w-4 text-slate-500 transition-transform dark:text-dark-text-secondary',
																				{
																					'rotate-90 transform':
																						expandedSections.includes(
																							section.title
																						)
																				}
																			)}
																		/>
																	</button>
																)}
															</div>
														</li>
														{section.subsections &&
															expandedSections.includes(
																section.title
															) && (
																<ul className="my-4 ml-4 space-y-2 border-l-2 border-slate-100 dark:border-slate-800  lg:border-slate-200">
																	{section.subsections.map(
																		subsection => (
																			<li
																				key={
																					subsection.title
																				}
																				className="relative"
																			>
																				<Link
																					href={prependVersion(
																						subsection.href
																					)}
																					onClick={
																						onLinkClick
																					}
																					className={clsx(
																						'flex items-center py-0.5 pl-3.5 transition-colors before:pointer-events-none before:absolute before:-left-0.5 before:h-full before:w-[2px]',
																						subsection.href ===
																							pathname
																							? 'font-semibold text-link-light before:bg-link-light dark:text-link dark:before:bg-link'
																							: 'text-slate-500 before:hidden before:bg-slate-900 hover:text-slate-900 hover:before:block dark:text-dark-text-secondary dark:before:bg-slate-100 dark:hover:text-slate-100'
																					)}
																				>
																					{
																						subsection.title
																					}
																				</Link>
																			</li>
																		)
																	)}
																</ul>
															)}
													</>
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
