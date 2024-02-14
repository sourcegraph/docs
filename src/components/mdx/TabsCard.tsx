'use client';
import {Tab} from '@headlessui/react';
import clsx from 'clsx';

export default function TabsCard() {
	return (
		<>
			<div className="w-full rounded-lg border border-light-border-2 dark:border-dark-border ">
				<Tab.Group>
					<Tab.List
						className="flex flex-wrap space-x-6 rounded-t-md border-b border-light-border-2 bg-light-bg-2/70 px-4 text-center text-sm font-medium dark:border-dark-border dark:bg-dark-bg-2"
						id="defaultTab"
						data-tabs-toggle="#defaultTabContent"
					>
						<Tab
							className={({selected}) =>
								clsx(
									selected
										? 'border-slate-900 text-slate-900 dark:border-slate-200 dark:text-gray-200'
										: 'border-transparent text-slate-500 hover:border-slate-900 hover:text-slate-900  dark:hover:border-slate-200 dark:hover:text-gray-200',
									'-mb-px whitespace-nowrap border-b px-1 py-3 text-sm font-medium transition-colors duration-300'
								)
							}
						>
							Free
						</Tab>
						<Tab
							className={({selected}) =>
								clsx(
									selected
										? 'border-slate-900 text-slate-900 dark:border-slate-200 dark:text-gray-200'
										: 'border-transparent text-slate-500 hover:border-slate-900 hover:text-slate-900  dark:hover:border-slate-200 dark:hover:text-gray-200',
									'-mb-px whitespace-nowrap border-b px-1 py-3 text-sm font-medium transition-colors duration-300'
								)
							}
						>
							Standard
						</Tab>
					</Tab.List>
					<Tab.Panels className="mt-2 px-4">
						<Tab.Panel>
							<p>
								Quis incididunt reprehenderit id incididunt
								adipisicing id proident fugiat esse sit sit
								eiusmod. Amet eiusmod culpa adipisicing deserunt
								pariatur ex nostrud aute ex. Cillum proident est
								tempor do mollit in irure. Magna commodo
								reprehenderit ex ea non et anim cillum ullamco
								consectetur sit dolor sint deserunt pariatur.
								Elit nulla ex labore do excepteur. Reprehenderit
								sit consequat culpa voluptate eiusmod. Minim
								Lorem minim aute quis in sint ex laborum culpa
								dolor et ex duis. Id id eiusmod minim qui
								excepteur amet officia culpa culpa mollit tempor
								dolor.
							</p>
						</Tab.Panel>
						<Tab.Panel>
							<p>
								Est minim nulla cupidatat proident incididunt
								duis et do dolore proident amet. Amet excepteur
								do consequat ipsum tempor. Sunt in officia irure
								proident commodo sunt enim anim veniam velit
								proident irure. Esse consequat eu elit minim
								aliqua ullamco aute do velit id nisi occaecat
								officia ex.
							</p>
						</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>
			</div>
		</>
	);
}
