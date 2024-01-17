import {Fragment} from 'react';
import {Menu, Transition} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/20/solid';
import clsx from 'clsx';

export default function VersionSelect() {
	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button
					className="inline-flex w-full items-center justify-center gap-x-1.5
				rounded-md px-2 py-2 text-xs font-medium text-slate-500 shadow-sm ring-1 ring-inset ring-light-border-2 hover:bg-slate-100 dark:bg-dark-bg-2 dark:text-slate-400 dark:ring-inset dark:ring-dark-border"
				>
					latest
					<ChevronDownIcon
						className="-mr-1 h-4 w-4"
						aria-hidden="true"
					/>
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-light-bg-1 text-slate-400 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-dark-bg-2">
					<div className="py-1">
						<Menu.Item>
							{({active}) => (
								<a
									href="#"
									className={clsx(
										active
											? 'bg-slate-100 text-slate-900'
											: 'text-slate-400',
										'block px-4 py-2 text-sm'
									)}
								>
									v5.2.5
								</a>
							)}
						</Menu.Item>
						<Menu.Item>
							{({active}) => (
								<a
									href="#"
									className={clsx(
										active
											? 'bg-slate-100 text-slate-900'
											: 'text-slate-400',
										'block px-4 py-2 text-sm'
									)}
								>
									v5.2.4
								</a>
							)}
						</Menu.Item>
						<Menu.Item>
							{({active}) => (
								<a
									href="#"
									className={clsx(
										active
											? 'bg-slate-100 text-slate-900'
											: 'text-slate-400',
										'block px-4 py-2 text-sm'
									)}
								>
									v5.2.3
								</a>
							)}
						</Menu.Item>
						<form method="POST" action="#">
							<Menu.Item>
								{({active}) => (
									<button
										type="submit"
										className={clsx(
											active
												? 'bg-slate-100 text-slate-900'
												: 'text-slate-400',
											'block w-full px-4 py-2 text-left text-sm'
										)}
									>
										v5.2.2
									</button>
								)}
							</Menu.Item>
						</form>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
