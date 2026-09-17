import React, {useSyncExternalStore} from 'react';

import {SearchIcon} from './icons/SearchIcon';

export type ButtonTranslations = Partial<{
	buttonText: string;
	buttonAriaLabel: string;
}>;

export type DocSearchButtonProps = React.ComponentProps<'button'> & {
	translations?: ButtonTranslations;
};

const ACTION_KEY_DEFAULT = 'Ctrl' as const;
const ACTION_KEY_APPLE = '⌘' as const;

function isAppleDevice() {
	return /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
}

const subscribe = () => () => {};

export const DocSearchButton = React.forwardRef<
	HTMLButtonElement,
	DocSearchButtonProps
>(({translations = {}, ...props}, ref) => {
	const {buttonText = 'Search docs...', buttonAriaLabel = 'Search docs...'} =
		translations;

	const modifierKey = useSyncExternalStore(
		subscribe,
		() => (isAppleDevice() ? ACTION_KEY_APPLE : ACTION_KEY_DEFAULT),
		() => ACTION_KEY_DEFAULT
	);

	return (
		<button type="button" aria-label={buttonAriaLabel} {...props} ref={ref}>
			<div className="group flex h-6 w-6 items-center justify-center sm:justify-start md:h-9 md:w-80 md:flex-none md:rounded-lg md:pl-4 md:pr-3.5 md:text-sm md:ring-1 md:ring-light-border md:hover:ring-slate-400 dark:md:bg-dark-bg-1 dark:md:ring-inset dark:md:ring-dark-border dark:md:hover:ring-slate-500 lg:w-96">
				<SearchIcon className="hidden h-5 w-5 fill-slate-400 group-hover:fill-slate-500 dark:fill-slate-500 md:block md:flex-none md:group-hover:fill-slate-400" />

				<div className="mt-1 flex items-center justify-center rounded-lg md:hidden">
					<SearchIcon className="h-6 w-6 text-slate-400" />
				</div>
				<span className="sr-only md:not-sr-only md:ml-2 md:text-slate-500 md:dark:text-slate-400">
					{buttonText}
				</span>

				{modifierKey && (
					<kbd className="ml-auto hidden font-medium text-slate-500 dark:text-slate-400 md:block">
						<kbd className="font-sans">{modifierKey}</kbd>
						<kbd className="font-sans">K</kbd>
					</kbd>
				)}
			</div>
		</button>
	);
});

DocSearchButton.displayName = 'DocSearchButton';
