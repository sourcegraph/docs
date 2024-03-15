'use client';

import {Disclosure} from '@headlessui/react';
import {ChevronRightIcon} from '@heroicons/react/20/solid';
import clsx from 'clsx';

interface AccordionProps {
	title: string;
	children: React.ReactNode;
}

export default function Accordion({title, children}: AccordionProps) {
	return (
		<div className="w-full border-b border-light-border py-3 dark:border-dark-border">
			<Disclosure>
				{({open}) => (
					<>
						<Disclosure.Button className="flex w-full items-center gap-4 py-1 text-left font-medium focus:outline-none dark:text-white">
							<ChevronRightIcon
								className={clsx(
									open ? 'rotate-90 transform' : '',
									'h-5 w-5 opacity-70 transition-transform'
								)}
							/>
							<span>{title}</span>
						</Disclosure.Button>
						<Disclosure.Panel className="ml-9">
							{children}
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</div>
	);
}
