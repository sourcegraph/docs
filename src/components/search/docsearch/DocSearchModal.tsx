import {
	createAutocomplete,
	type AlgoliaInsightsHit
} from '@algolia/autocomplete-core';
import type {SearchResponse} from '@algolia/client-search';
import {useRouter} from 'next/navigation';
import React from 'react';

import type {DocSearchProps} from './DocSearch';
import type {FooterTranslations} from './Footer';
import {Footer} from './Footer';
import {Hit} from './Hit';
import type {ScreenStateTranslations} from './ScreenState';
import {ScreenState} from './ScreenState';
import type {SearchBoxTranslations} from './SearchBox';
import {SearchBox} from './SearchBox';
import {MAX_QUERY_SIZE} from './constants';
import {createStoredSearches} from './stored-searches';
import type {
	DocSearchHit,
	DocSearchState,
	InternalDocSearchHit,
	StoredDocSearchHit
} from './types';
import {useSearchClient} from './useSearchClient';
import {useTouchEvents} from './useTouchEvents';
import {useTrapFocus} from './useTrapFocus';
import {
	groupBy,
	identity,
	isModifierEvent,
	noop,
	removeHighlightTags
} from './utils';

export type ModalTranslations = Partial<{
	searchBox: SearchBoxTranslations;
	footer: FooterTranslations;
}> &
	ScreenStateTranslations;

export type DocSearchModalProps = DocSearchProps & {
	initialScrollY: number;
	onClose?: () => void;
	translations?: ModalTranslations;
};

const SNIPPET_LENGTH = 12;

export function DocSearchModal({
	appId,
	apiKey,
	indexName,
	placeholder = 'What are you searching for?',
	searchParameters,
	productFilters = [],
	maxResultsPerGroup,
	onClose = noop,
	transformItems = identity,
	hitComponent = Hit,
	resultsFooterComponent = () => null,
	navigator,
	initialScrollY = 0,
	transformSearchClient = identity,
	disableUserPersonalization = false,
	initialQuery: initialQueryFromProp = '',
	translations = {},
	getMissingResultsUrl,
	insights = false
}: DocSearchModalProps) {
	const {
		footer: footerTranslations,
		searchBox: searchBoxTranslations,
		...screenStateTranslations
	} = translations;
	const router = useRouter();
	const [initialQueryFromSelection] = React.useState(() =>
		typeof window !== 'undefined'
			? window.getSelection()?.toString().slice(0, MAX_QUERY_SIZE) || ''
			: ''
	);
	const initialQuery = initialQueryFromProp || initialQueryFromSelection;
	const [favoriteSearches] = React.useState(() =>
		createStoredSearches<StoredDocSearchHit>({
			key: `__DOCSEARCH_FAVORITE_SEARCHES__${indexName}`,
			limit: 10
		})
	);
	const [recentSearches] = React.useState(() =>
		createStoredSearches<StoredDocSearchHit>({
			key: `__DOCSEARCH_RECENT_SEARCHES__${indexName}`,
			limit: favoriteSearches.getAll().length === 0 ? 7 : 4
		})
	);
	const [state, setState] = React.useState<
		DocSearchState<InternalDocSearchHit>
	>({
		query: initialQuery,
		collections: [],
		completion: null,
		context: {},
		isOpen: false,
		activeItemId: null,
		status: 'idle'
	});

	const containerRef = React.useRef<HTMLDivElement | null>(null);
	const modalRef = React.useRef<HTMLDivElement | null>(null);
	const formElementRef = React.useRef<HTMLDivElement | null>(null);
	const dropdownRef = React.useRef<HTMLDivElement | null>(null);
	const inputRef = React.useRef<HTMLInputElement | null>(null);
	const [activeProduct, setActiveProduct] = React.useState<string | null>(
		null
	);

	const searchClient = useSearchClient(appId, apiKey, transformSearchClient);

	const saveRecentSearch = React.useCallback(
		function saveRecentSearch(item: InternalDocSearchHit) {
			if (disableUserPersonalization) {
				return;
			}

			// We don't store `content` record, but their parent if available.
			const search =
				item.type === 'content' ? item.__docsearch_parent : item;

			// We save the recent search only if it's not favorited.
			if (
				search &&
				favoriteSearches
					.getAll()
					.findIndex(x => x.objectID === search.objectID) === -1
			) {
				recentSearches.add(search);
			}
		},
		[favoriteSearches, recentSearches, disableUserPersonalization]
	);

	const sendItemClickEvent = React.useCallback(
		(item: InternalDocSearchHit) => {
			if (!state.context.algoliaInsightsPlugin || !item.__autocomplete_id)
				return;

			const insightsItem = item as AlgoliaInsightsHit;

			const insightsClickParams = {
				eventName: 'Item Selected',
				index: insightsItem.__autocomplete_indexName,
				items: [insightsItem],
				positions: [item.__autocomplete_id],
				queryID: insightsItem.__autocomplete_queryID
			};

			state.context.algoliaInsightsPlugin.insights.clickedObjectIDsAfterSearch(
				insightsClickParams
			);
		},
		[state.context.algoliaInsightsPlugin]
	);

	const autocomplete = React.useMemo(
		() =>
			createAutocomplete<
				InternalDocSearchHit,
				React.FormEvent<HTMLFormElement>,
				React.MouseEvent,
				React.KeyboardEvent
			>({
				id: 'docsearch',
				defaultActiveItemId: 0,
				placeholder,
				openOnFocus: true,
				initialState: {
					query: initialQuery,
					context: {
						searchSuggestions: ['Cody', 'Code Search'],
						activeProduct: null
					}
				},
				insights,
				navigator,
				onStateChange(props) {
					setState(props.state);
				},
				getSources({
					query,
					state: sourcesState,
					setContext,
					setStatus
				}) {
					if (!query) {
						if (disableUserPersonalization) {
							return [];
						}

						return [
							{
								sourceId: 'recentSearches',
								onSelect({item, event}) {
									saveRecentSearch(item);

									if (!isModifierEvent(event)) {
										onClose();
									}
								},
								getItemUrl({item}) {
									return item.url;
								},
								getItems() {
									return recentSearches.getAll() as InternalDocSearchHit[];
								}
							},
							{
								sourceId: 'favoriteSearches',
								onSelect({item, event}) {
									saveRecentSearch(item);

									if (!isModifierEvent(event)) {
										onClose();
									}
								},
								getItemUrl({item}) {
									return item.url;
								},
								getItems() {
									return favoriteSearches.getAll() as InternalDocSearchHit[];
								}
							}
						];
					}

					const insightsActive = Boolean(insights);
					const product = sourcesState.context.activeProduct as
						| string
						| null;

					return searchClient
						.search<DocSearchHit>([
							{
								query,
								indexName,
								params: {
									attributesToRetrieve: [
										'hierarchy.lvl0',
										'hierarchy.lvl1',
										'hierarchy.lvl2',
										'hierarchy.lvl3',
										'hierarchy.lvl4',
										'hierarchy.lvl5',
										'hierarchy.lvl6',
										'content',
										'type',
										'url',
										'product'
									],
									...(product
										? {facetFilters: [`product:${product}`]}
										: {}),
									attributesToSnippet: [
										`hierarchy.lvl1:${SNIPPET_LENGTH}`,
										`hierarchy.lvl2:${SNIPPET_LENGTH}`,
										`hierarchy.lvl3:${SNIPPET_LENGTH}`,
										`hierarchy.lvl4:${SNIPPET_LENGTH}`,
										`hierarchy.lvl5:${SNIPPET_LENGTH}`,
										`hierarchy.lvl6:${SNIPPET_LENGTH}`,
										`content:${SNIPPET_LENGTH}`
									],
									snippetEllipsisText: '…',
									highlightPreTag: '<mark>',
									highlightPostTag: '</mark>',
									hitsPerPage: 20,
									clickAnalytics: insightsActive,
									...searchParameters
								}
							}
						])
						.catch(error => {
							// The Algolia `RetryError` happens when all the servers have
							// failed, meaning that there's no chance the response comes
							// back. This is the right time to display an error.
							// See https://github.com/algolia/algoliasearch-client-javascript/blob/2ffddf59bc765cd1b664ee0346b28f00229d6e12/packages/transporter/src/errors/createRetryError.ts#L5
							if (error.name === 'RetryError') {
								setStatus('error');
							}

							throw error;
						})
						.then(({results}) => {
							const firstResult =
								results[0] as SearchResponse<DocSearchHit>;
							const {hits, nbHits} = firstResult;
							const sources = groupBy<DocSearchHit>(
								hits,
								hit => removeHighlightTags(hit),
								maxResultsPerGroup
							);

							// We store the `lvl0`s to display them as search suggestions
							// in the "no results" screen.
							if (
								(
									sourcesState.context
										.searchSuggestions as any[]
								).length < Object.keys(sources).length
							) {
								setContext({
									searchSuggestions: Object.keys(sources)
								});
							}

							setContext({nbHits});

							let insightsParams = {};

							if (insightsActive) {
								insightsParams = {
									__autocomplete_indexName: indexName,
									__autocomplete_queryID: firstResult.queryID,
									__autocomplete_algoliaCredentials: {
										appId,
										apiKey
									}
								};
							}

							return Object.values<DocSearchHit[]>(sources).map(
								(items, index) => {
									return {
										sourceId: `hits${index}`,
										onSelect({item, event}) {
											saveRecentSearch(item);

											if (!isModifierEvent(event)) {
												onClose();
											}
										},
										getItemUrl({item}) {
											return item.url;
										},
										getItems() {
											return Object.values(
												groupBy(
													transformItems(items),
													item => item.hierarchy.lvl1,
													maxResultsPerGroup
												)
											)
												.map(groupedHits =>
													groupedHits.map(item => {
														let parent: InternalDocSearchHit | null =
															null;

														const potentialParent =
															groupedHits.find(
																siblingItem =>
																	siblingItem.type ===
																		'lvl1' &&
																	siblingItem
																		.hierarchy
																		.lvl1 ===
																		item
																			.hierarchy
																			.lvl1
															) as
																| InternalDocSearchHit
																| undefined;

														if (
															item.type !==
																'lvl1' &&
															potentialParent
														) {
															parent =
																potentialParent;
														}

														return {
															...item,
															__docsearch_parent:
																parent,
															...insightsParams
														};
													})
												)
												.flat();
										}
									};
								}
							);
						});
				}
			}),
		[
			indexName,
			searchParameters,
			maxResultsPerGroup,
			searchClient,
			onClose,
			recentSearches,
			favoriteSearches,
			saveRecentSearch,
			initialQuery,
			placeholder,
			navigator,
			transformItems,
			disableUserPersonalization,
			insights,
			appId,
			apiKey
		]
	);

	const {getEnvironmentProps, getRootProps, refresh, setContext} =
		autocomplete;

	const selectProduct = React.useCallback(
		(product: string | null) => {
			const next = product === activeProduct ? null : product;
			setActiveProduct(next);
			setContext({activeProduct: next});
			// Re-run `getSources` with the current query and the new filter.
			refresh();
			inputRef.current?.focus();
		},
		[activeProduct, refresh, setContext]
	);

	useTouchEvents({
		getEnvironmentProps,
		panelRef: dropdownRef,
		formRef: formElementRef,
		inputRef
	});
	useTrapFocus({containerRef});

	React.useEffect(() => {
		document.body.classList.add('DocSearch--active');

		return () => {
			document.body.classList.remove('DocSearch--active');

			// IE11 doesn't support `scrollTo` so we check that the method exists
			// first.
			window.scrollTo?.(0, initialScrollY);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		if (dropdownRef.current) {
			dropdownRef.current.scrollTop = 0;
		}
	}, [state.query]);

	React.useEffect(() => {
		const url = new URL(window.location.href);
		if (state.query) {
			url.searchParams.set('search', state.query);
		} else {
			url.searchParams.delete('search');
		}
		window.history.replaceState(window.history.state, '', url);
	}, [state.query]);

	React.useEffect(() => {
		if (state.activeItemId === null) return;
		const activeItem = state.collections
			.flatMap(collection => collection.items)
			.find(item => item.__autocomplete_id === state.activeItemId);
		if (activeItem) router.prefetch(activeItem.url);
	}, [router, state.activeItemId, state.collections]);

	// We don't focus the input when there's an initial query (i.e. Selection
	// Search) because users rather want to see the results directly, without the
	// keyboard appearing.
	// We therefore need to refresh the autocomplete instance to load all the
	// results, which is usually triggered on focus.
	React.useEffect(() => {
		if (initialQuery.length > 0) {
			refresh();

			if (inputRef.current) {
				inputRef.current.focus();
			}
		}
	}, [initialQuery, refresh]);

	// We rely on a CSS property to set the modal height to the full viewport height
	// because all mobile browsers don't compute their height the same way.
	// See https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
	React.useEffect(() => {
		function setFullViewportHeight() {
			if (modalRef.current) {
				const vh = window.innerHeight * 0.01;
				modalRef.current.style.setProperty('--docsearch-vh', `${vh}px`);
			}
		}

		setFullViewportHeight();

		window.addEventListener('resize', setFullViewportHeight);

		return () => {
			window.removeEventListener('resize', setFullViewportHeight);
		};
	}, []);

	return (
		<div
			ref={containerRef}
			{...getRootProps({
				'aria-expanded': true
			})}
			className={[
				'DocSearch',
				'DocSearch-Container',
				'z-50 bg-slate-300/50 p-4 backdrop-blur backdrop-filter dark:bg-slate-900/40',
				state.status === 'stalled' && 'DocSearch-Container--Stalled',
				state.status === 'error' && 'DocSearch-Container--Errored'
			]
				.filter(Boolean)
				.join(' ')}
			role="button"
			tabIndex={0}
			onKeyDownCapture={event => {
				if (
					event.key !== 'Enter' ||
					(!event.metaKey && !event.ctrlKey) ||
					state.activeItemId === null
				) {
					return;
				}
				const activeItem = state.collections
					.flatMap(collection => collection.items)
					.find(
						item => item.__autocomplete_id === state.activeItemId
					);
				if (activeItem) {
					event.preventDefault();
					event.stopPropagation();
					window.open(
						activeItem.url,
						'_blank',
						'noopener,noreferrer'
					);
				}
			}}
			onMouseDown={event => {
				if (event.target === event.currentTarget) {
					onClose();
				}
			}}
		>
			<div
				className="DocSearch-Modal w-full max-w-xl overflow-hidden rounded-2xl border border-light-border-2 bg-light-bg dark:border-dark-border dark:bg-dark-bg"
				ref={modalRef}
			>
				{/* <header className="DocSearch-SearchBar border-light-border-2 dark:border-dark-border flex items-center space-x-4 border-b p-4" ref={formElementRef}> */}
				<header
					className="flex items-center space-x-4 border-b border-light-border-2 p-4 dark:border-dark-border"
					ref={formElementRef}
				>
					<SearchBox
						{...autocomplete}
						state={state}
						autoFocus={initialQuery.length === 0}
						inputRef={inputRef}
						isFromSelection={
							Boolean(initialQuery) &&
							initialQuery === initialQueryFromSelection
						}
						translations={searchBoxTranslations}
						onClose={onClose}
					/>
				</header>

				{productFilters.length > 0 && (
					<div className="DocSearch-Products-wrap">
						<div
							className="DocSearch-Products"
							role="toolbar"
							aria-label="Filter results by product"
						>
							<button
								type="button"
								className="DocSearch-Product"
								aria-pressed={activeProduct === null}
								onClick={() => selectProduct(null)}
							>
								All
							</button>
							{productFilters.map(product => (
								<button
									key={product}
									type="button"
									className="DocSearch-Product"
									aria-pressed={activeProduct === product}
									onClick={() => selectProduct(product)}
								>
									{product}
								</button>
							))}
						</div>
					</div>
				)}

				<div className="DocSearch-Dropdown" ref={dropdownRef}>
					<ScreenState
						{...autocomplete}
						indexName={indexName}
						state={state}
						hitComponent={hitComponent}
						resultsFooterComponent={resultsFooterComponent}
						disableUserPersonalization={disableUserPersonalization}
						recentSearches={recentSearches}
						favoriteSearches={favoriteSearches}
						inputRef={inputRef}
						translations={screenStateTranslations}
						getMissingResultsUrl={getMissingResultsUrl}
						onItemClick={(item, event) => {
							// If insights is active, send insights click event
							sendItemClickEvent(item);

							saveRecentSearch(item);
							if (!isModifierEvent(event)) {
								onClose();
							}
						}}
					/>
				</div>

				<footer className="DocSearch-Footer">
					<Footer translations={footerTranslations} />
				</footer>
			</div>
		</div>
	);
}
