import {useEffect, useState} from 'react';
import {KBarButton} from './KBarButton';
import {SearchIcon} from '../icons/SearchIcon';

export const Search = () => {
	let [modifierKey, setModifierKey] = useState<string>();

	useEffect(() => {
		const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
		setModifierKey(isMac ? '⌘' : 'Ctrl');
	}, []);

	return (
		<KBarButton>
			<div className="group flex h-6 w-6 items-center justify-center sm:justify-start md:h-auto md:w-80 md:flex-none md:rounded-lg md:py-2.5 md:pl-4 md:pr-3.5 md:text-sm md:ring-1 md:ring-slate-200 md:hover:ring-slate-400 dark:md:bg-slate-800/70 dark:md:ring-inset dark:md:ring-white/5 dark:md:hover:ring-slate-500 lg:w-96">
				<SearchIcon className="h-5 w-5 flex-none fill-slate-400 group-hover:fill-slate-500 dark:fill-slate-500 md:group-hover:fill-slate-400" />
				<span className="sr-only md:not-sr-only md:ml-2 md:text-slate-500 md:dark:text-slate-500">
					Search docs...
				</span>
				{modifierKey && (
					<kbd className="ml-auto hidden font-medium text-slate-400 dark:text-slate-600 md:block">
						<kbd className="font-sans">{modifierKey}</kbd>
						<kbd className="font-sans">K</kbd>
					</kbd>
				)}
			</div>
		</KBarButton>
	);
};
