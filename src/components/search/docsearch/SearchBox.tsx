import type {
	AutocompleteApi,
	AutocompleteState
} from '@algolia/autocomplete-core';
import type {MutableRefObject} from 'react';
import React from 'react';

import {MAX_QUERY_SIZE} from './constants';
import {LoadingIcon} from './icons/LoadingIcon';
import {ResetIcon} from './icons/ResetIcon';
import {SearchIcon} from './icons/SearchIcon';

import type {InternalDocSearchHit} from './types';

export type SearchBoxTranslations = Partial<{
	resetButtonTitle: string;
	resetButtonAriaLabel: string;
	cancelButtonText: string;
	cancelButtonAriaLabel: string;
	searchInputLabel: string;
}>;

interface SearchBoxProps
	extends AutocompleteApi<
		InternalDocSearchHit,
		React.FormEvent,
		React.MouseEvent,
		React.KeyboardEvent
	> {
	state: AutocompleteState<InternalDocSearchHit>;
	autoFocus: boolean;
	inputRef: MutableRefObject<HTMLInputElement | null>;
	onClose: () => void;
	isFromSelection: boolean;
	translations?: SearchBoxTranslations;
}

export function SearchBox({translations = {}, ...props}: SearchBoxProps) {
	const {
		resetButtonTitle = 'Clear the query',
		resetButtonAriaLabel = 'Clear the query',
		cancelButtonText = 'Cancel',
		cancelButtonAriaLabel = 'Cancel',
		searchInputLabel = 'Search'
	} = translations;
	const {onReset} = props.getFormProps({
		inputElement: props.inputRef.current
	});

	React.useEffect(() => {
		if (props.autoFocus && props.inputRef.current) {
			props.inputRef.current.focus();
		}
	}, [props.autoFocus, props.inputRef]);

	React.useEffect(() => {
		if (props.isFromSelection && props.inputRef.current) {
			props.inputRef.current.select();
		}
	}, [props.isFromSelection, props.inputRef]);

	return (
		<>
			<form
				// className="DocSearch-Form"
				className="flex w-full items-center space-x-4"
				onSubmit={event => {
					event.preventDefault();
				}}
				onReset={onReset}
			>
				{/* <label className="DocSearch-MagnifierLabel block w-5" {...props.getLabelProps()}> */}
				<label className="block w-5" {...props.getLabelProps()}>
					<SearchIcon className="text-slate-400 dark:text-slate-300" />
					<span className="DocSearch-VisuallyHiddenForAccessibility">
						{searchInputLabel}
					</span>
				</label>

				<div className="DocSearch-LoadingIndicator">
					<LoadingIcon />
				</div>

				<input
					// className="DocSearch-Input"
					className="DocSearch-Input h-8 w-full bg-transparent text-base text-slate-600 placeholder-slate-400 focus:outline-none dark:text-dark-text-primary dark:placeholder-slate-500"
					// className="h-8 w-full bg-transparent text-slate-600 placeholder-slate-400 focus:outline-none dark:text-dark-text-primary dark:placeholder-slate-500"
					ref={props.inputRef}
					{...props.getInputProps({
						inputElement: props.inputRef.current!,
						autoFocus: props.autoFocus,
						maxLength: MAX_QUERY_SIZE
					})}
				/>

				{!props.state.query && (
					<kbd className="inline-block whitespace-nowrap rounded border border-slate-500 px-1.5 align-middle text-xs font-medium leading-4 tracking-wide text-slate-500">
						ESC
					</kbd>
				)}

				<button
					type="reset"
					title={resetButtonTitle}
					className="DocSearch-Reset"
					aria-label={resetButtonAriaLabel}
					hidden={!props.state.query}
				>
					<ResetIcon />
				</button>
			</form>

			<button
				className="DocSearch-Cancel"
				type="reset"
				aria-label={cancelButtonAriaLabel}
				onClick={props.onClose}
			>
				{cancelButtonText}
			</button>
		</>
	);
}
