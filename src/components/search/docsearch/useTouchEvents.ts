import type {AutocompleteApi} from '@algolia/autocomplete-core';
import React from 'react';

interface UseTouchEventsProps {
	getEnvironmentProps: AutocompleteApi<any>['getEnvironmentProps'];
	panelRef: React.RefObject<HTMLDivElement | null>;
	formRef: React.RefObject<HTMLDivElement | null>;
	inputRef: React.RefObject<HTMLInputElement | null>;
}

export function useTouchEvents({
	getEnvironmentProps,
	panelRef,
	formRef,
	inputRef
}: UseTouchEventsProps) {
	React.useEffect(() => {
		const panelElement = panelRef.current;
		const formElement = formRef.current;
		const inputElement = inputRef.current;
		if (!(panelElement && formElement && inputElement)) {
			return undefined;
		}

		const {onTouchStart, onTouchMove} = getEnvironmentProps({
			panelElement,
			formElement,
			inputElement
		});

		window.addEventListener('touchstart', onTouchStart);
		window.addEventListener('touchmove', onTouchMove);

		return () => {
			window.removeEventListener('touchstart', onTouchStart);
			window.removeEventListener('touchmove', onTouchMove);
		};
	}, [getEnvironmentProps, panelRef, formRef, inputRef]);
}
