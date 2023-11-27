import cn from 'mxcn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NavigationItem, navigation } from '@/lib/navigation';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';

export function Navigation({
	className,
	onLinkClick
}: {
	className?: string;
	onLinkClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
	let pathname = usePathname();
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
	}, []);

	return (
		<nav className={cn('text-base lg:text-sm', className)}>
			<ul role="list" className="space-y-9">
				{navigation.map(separator => (
					<li key={separator.separator}>
						{/* <h2 className={cn("text-slate-900 dark:text-slate-200 font-display text-xs uppercase tracking-wide")}> */}
						<h2 className={cn("mb-8 lg:mb-3 font-semibold text-slate-900 dark:text-slate-200")}>
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
											href={topic.href}
											onClick={() => {
												onLinkClick;
												handleTopicClick(topic.title);
											}}
											className={cn(
												// 'flex w-full transition-colors',
												'block hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300',
												topic.href === pathname
													? 'dark:text-link text-link-light dark:before:bg-link before:bg-link-light '
													: 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
											)}
										>
											{topic.title}
										</Link>
										{topic.sections && (
											<button
												className="pointer-cursor hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md p-1"
												onClick={() =>
													handleTopicClick(
														topic.title,
														true
													)
												}
											>
												<ChevronRightIcon
													className={cn(
														'pointer-cursor duration-400 text-slate-500 dark:text-slate-400 h-4 w-4 transition-transform',
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
											<ul className="border-slate-100 dark:border-slate-800 lg:border-slate-200 my-4 space-y-2  border-l-2">
												{topic.sections.map(section => (
													<>
														<li
															key={section.title}
															className="relative"
														>
															<div className="flex w-full items-center justify-between">
																<Link
																	href={
																		section.href
																	}
																	onClick={() => {
																		onLinkClick;
																		handleSectionClick(
																			section.title,
																			true
																		);
																	}}
																	className={cn(
																		'flex w-full items-center py-0.5 pl-3.5 transition-colors before:pointer-events-none before:absolute before:-left-0.5 before:h-full before:w-[2px]',
																		section.href ===
																			pathname
																			? 'dark:text-link text-link-light dark:before:bg-link before:bg-link-light font-semibold'
																			: 'text-slate-500 before:bg-slate-900 hover:text-slate-900 dark:text-slate-400 dark:before:bg-slate-100 dark:hover:text-slate-100 before:hidden hover:before:block'
																	)}
																>
																	{
																		section.title
																	}
																</Link>
																{section.subsections && (
																	<button
																		className="pointer-cursor hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md p-1"
																		onClick={() =>
																			handleSectionClick(
																				section.title
																			)
																		}
																	>
																		<ChevronRightIcon
																			className={cn(
																				'pointer-cursor duration-400 text-slate-500 dark:text-slate-400 h-4 w-4 transition-transform',
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
																<ul className="border-slate-100 dark:border-slate-800 lg:border-slate-200 my-4 ml-4 space-y-2  border-l-2">
																	{section.subsections.map(
																		subsection => (
																			<li
																				key={
																					subsection.title
																				}
																				className="relative"
																			>
																				<Link
																					href={
																						subsection.href
																					}
																					onClick={
																						onLinkClick
																					}
																					className={cn(
																						'flex items-center py-0.5 pl-3.5 transition-colors before:pointer-events-none before:absolute before:-left-0.5 before:h-full before:w-[2px]',
																						subsection.href ===
																							pathname
																							? 'dark:text-link text-link-light dark:before:bg-link before:bg-link-light font-semibold'
																							: 'text-slate-500 before:bg-slate-900 hover:text-slate-900 dark:text-slate-400 dark:before:bg-slate-100 dark:hover:text-slate-100 before:hidden hover:before:block'
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
