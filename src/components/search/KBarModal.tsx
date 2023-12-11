// noinspection TypeScriptMissingConfigOption

import {
	KBarPortal,
	KBarSearch,
	KBarAnimator,
	KBarPositioner,
	KBarResults,
	useMatches,
	Action,
	useRegisterActions
} from 'kbar';
import {SearchIcon} from '../icons/SearchIcon';
import clsx from 'clsx';

export const KBarModal = ({
	actions,
	isLoading
}: {
	actions: Action[];
	isLoading: boolean;
}) => {
	useRegisterActions(actions, [actions]);

	return (
		<KBarPortal>
			<KBarPositioner className="z-50 bg-slate-300/50 p-4 backdrop-blur backdrop-filter dark:bg-dark-bg/50">
				<KBarAnimator className="w-full max-w-xl">
					<div className="border-light-border-2 dark:border-dark-border dark:bg-dark-bg-1 bg-light-bg overflow-hidden rounded-2xl border">
						<div className="border-light-border-2 dark:border-dark-border flex items-center space-x-4 border-b p-4">
							<span className="block w-5">
								<SearchIcon className="text-slate-400 dark:text-slate-300" />
							</span>
							<KBarSearch
								defaultPlaceholder="What do you need?"
								className="h-8 w-full bg-transparent text-slate-600 placeholder-slate-400 focus:outline-none dark:text-slate-200 dark:placeholder-slate-500"
							/>
							<kbd className="inline-block whitespace-nowrap rounded border border-slate-400 px-1.5 align-middle text-xs font-medium leading-4 tracking-wide text-slate-400">
								ESC
							</kbd>
						</div>
						{!isLoading && <RenderResults />}
						{isLoading && (
							<div className="block px-4 py-8 text-center text-slate-400 dark:text-slate-600">
								Loading...
							</div>
						)}
					</div>
				</KBarAnimator>
			</KBarPositioner>
		</KBarPortal>
	);
};

const RenderResults = () => {
	const {results} = useMatches();

	if (results.length) {
		return (
			<KBarResults
				items={results}
				onRender={({item, active}) => (
					<div>
						{typeof item === 'string' ? (
							<div className="pt-4">
								<div className="block px-4 pb-2 text-xs font-semibold uppercase text-link">
									{item}
								</div>
							</div>
						) : (
							<div
								className={`flex cursor-pointer justify-between px-4 py-2 ${
									active
										? 'dark:bg-dark-bg-2 bg-light-bg-2'
										: 'bg-transparent text-slate-700 dark:text-slate-100'
								}`}
							>
								<div className={'flex space-x-2'}>
									<div className="block">
										<div
											className={clsx(
												active &&
													'font-medium text-link'
											)}
										>
											{item.name}
										</div>
										{item.subtitle && (
											<div className="mt-1 text-xs text-slate-400 dark:text-slate-500">
												{item.subtitle}
											</div>
										)}
									</div>
								</div>
								{item.shortcut?.length ? (
									<div
										aria-hidden
										className="flex flex-row items-center justify-center gap-x-2"
									>
										{item.shortcut.map(sc => (
											<kbd
												key={sc}
												className={`flex h-7 w-6 items-center justify-center rounded border text-xs font-medium ${
													active
														? 'border-slate-200 text-slate-200'
														: 'border-slate-400 text-slate-400'
												}`}
											>
												{sc}
											</kbd>
										))}
									</div>
								) : null}
							</div>
						)}
					</div>
				)}
			/>
		);
	} else {
		return (
			<div className="block px-4 py-8 text-center text-slate-400 dark:text-slate-600">
				No results for your search...
			</div>
		);
	}
};
