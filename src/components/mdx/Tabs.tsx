'use client';

import React, {ReactNode, useMemo} from 'react';
import {Tab as HeadlessTab} from '@headlessui/react';
import clsx from 'clsx';

interface TabData {
	title: string;
	content: ReactNode;
}

interface TabsProps {
	children: ReactNode;
}

export function Tabs({children}: TabsProps) {
	// Get title and content of tabs
	const tabs: TabData[] = useMemo(
		() =>
			(
				React.Children.map(children, child => {
					if (!React.isValidElement(child)) return null;

					const title = child.props.title;
					const content = child.props.children;
					return {title, content};
				}) as TabData[]
			).filter(Boolean),
		[children]
	);

	return (
		<>
			<div className="w-full rounded-lg border border-light-border-2 dark:border-dark-border ">
				<HeadlessTab.Group>
					<HeadlessTab.List
						className="flex flex-wrap space-x-6 rounded-t-md border-b border-light-border-2 bg-light-bg-2/70 px-4 text-center text-sm font-medium dark:border-dark-border dark:bg-dark-bg-2"
						id="defaultTab"
						data-tabs-toggle="#defaultTabContent"
					>
						{tabs.map((tab, index) => (
							<HeadlessTab
								key={index}
								className={({selected}) =>
									clsx(
										selected
											? 'border-slate-900 text-slate-900 dark:border-slate-200 dark:text-gray-200'
											: 'border-transparent text-slate-500 hover:border-slate-900 hover:text-slate-900  dark:hover:border-slate-200 dark:hover:text-gray-200',
										'-mb-px whitespace-nowrap border-b px-1 py-3 text-sm font-medium transition-colors duration-300'
									)
								}
							>
								{tab.title}
							</HeadlessTab>
						))}
					</HeadlessTab.List>
					<HeadlessTab.Panels className="mt-2 px-4">
						{tabs.map((tab, index) => (
							<HeadlessTab.Panel key={index}>
								<p>{tab.content}</p>
							</HeadlessTab.Panel>
						))}
					</HeadlessTab.Panels>
				</HeadlessTab.Group>
			</div>
		</>
	);
}

interface TabProps {
	title?: string;
	children: ReactNode;
}

export function Tab({children, ...props}: TabProps) {
	return children;
}
