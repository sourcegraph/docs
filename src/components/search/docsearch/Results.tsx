import type {
	AutocompleteApi,
	AutocompleteState,
	BaseItem
} from '@algolia/autocomplete-core';
import React from 'react';

import type {DocSearchProps} from './DocSearch';
import {Snippet} from './Snippet';
import type {InternalDocSearchHit, StoredDocSearchHit} from './types';

type HierarchyLevel = keyof StoredDocSearchHit['hierarchy'];

const HEADING_LEVELS: HierarchyLevel[] = [
	'lvl2',
	'lvl3',
	'lvl4',
	'lvl5',
	'lvl6'
];

/**
 * Hierarchy attributes shown as the breadcrumb under a hit, starting at the
 * page title (lvl1) and ending at the heading section the hit lives in.
 * - lvlN heading hits: lvl1 › lvl2 › … › lvl(N-1)
 * - content hits: lvl1 › deepest non-empty heading
 */
function getPathLevels(hit: StoredDocSearchHit): HierarchyLevel[] {
	const path: HierarchyLevel[] = ['lvl1'];
	if (hit.type === 'content') {
		const deepest = [...HEADING_LEVELS]
			.reverse()
			.find(level => hit.hierarchy[level]);
		if (deepest) path.push(deepest);
		return path;
	}
	for (const level of HEADING_LEVELS) {
		if (level === hit.type) break;
		if (hit.hierarchy[level]) path.push(level);
	}
	return path;
}

function HitPath({hit}: {hit: StoredDocSearchHit}) {
	const levels = getPathLevels(hit);
	return (
		<span className="DocSearch-Hit-path">
			{levels.map((level, index) => (
				<React.Fragment key={level}>
					{index > 0 && (
						<span className="DocSearch-Hit-path-separator" aria-hidden>
							{' › '}
						</span>
					)}
					<Snippet hit={hit} attribute={`hierarchy.${level}`} />
				</React.Fragment>
			))}
		</span>
	);
}

interface ResultsProps<TItem extends BaseItem>
	extends AutocompleteApi<
		TItem,
		React.FormEvent,
		React.MouseEvent,
		React.KeyboardEvent
	> {
	title: string;
	collection: AutocompleteState<TItem>['collections'][0];
	renderIcon: (props: {item: TItem; index: number}) => React.ReactNode;
	renderAction: (props: {
		item: TItem;
		runDeleteTransition: (cb: () => void) => void;
		runFavoriteTransition: (cb: () => void) => void;
	}) => React.ReactNode;
	onItemClick: (item: TItem, event: KeyboardEvent | MouseEvent) => void;
	hitComponent: DocSearchProps['hitComponent'];
}

export function Results<TItem extends StoredDocSearchHit>(
	props: ResultsProps<TItem>
) {
	if (!props.collection || props.collection.items.length === 0) {
		return null;
	}

	return (
		<section className="DocSearch-Hits">
			<div className="DocSearch-Hit-source">{props.title}</div>

			<ul {...props.getListProps()}>
				{props.collection.items.map((item, index) => {
					return (
						<Result
							key={[props.title, item.objectID].join(':')}
							item={item}
							index={index}
							{...props}
						/>
					);
				})}
			</ul>
		</section>
	);
}

interface ResultProps<TItem extends BaseItem> extends ResultsProps<TItem> {
	item: TItem;
	index: number;
}

function Result<TItem extends StoredDocSearchHit>({
	item,
	index,
	renderIcon,
	renderAction,
	getItemProps,
	onItemClick,
	collection,
	hitComponent
}: ResultProps<TItem>) {
	const [isDeleting, setIsDeleting] = React.useState(false);
	const [isFavoriting, setIsFavoriting] = React.useState(false);
	const action = React.useRef<(() => void) | null>(null);
	const Hit = hitComponent!;

	function runDeleteTransition(cb: () => void) {
		setIsDeleting(true);
		action.current = cb;
	}

	function runFavoriteTransition(cb: () => void) {
		setIsFavoriting(true);
		action.current = cb;
	}

	return (
		<li
			className={[
				'DocSearch-Hit',
				(item as unknown as InternalDocSearchHit).__docsearch_parent &&
					'DocSearch-Hit--Child',
				isDeleting && 'DocSearch-Hit--deleting',
				isFavoriting && 'DocSearch-Hit--favoriting'
			]
				.filter(Boolean)
				.join(' ')}
			onTransitionEnd={() => {
				if (action.current) {
					action.current();
				}
			}}
			{...getItemProps({
				item,
				source: collection.source,
				onClick(event: KeyboardEvent | MouseEvent) {
					onItemClick(item, event);
				}
			})}
		>
			<Hit hit={item}>
				<div className="DocSearch-Hit-Container">
					{renderIcon({item, index})}

					{/* @ts-ignore - unsure what's the issue here, will check later.  */}
					{item.hierarchy.lvl1 && item.type === 'lvl1' && (
						<div className="DocSearch-Hit-content-wrapper">
							<Snippet
								className="DocSearch-Hit-title"
								hit={item}
								attribute="hierarchy.lvl1"
							/>
						</div>
					)}
					{/* @ts-ignore - unsure what's the issue here, will check later.  */}
					{item.hierarchy[item.type] &&
						(item.type === 'lvl2' ||
							item.type === 'lvl3' ||
							item.type === 'lvl4' ||
							item.type === 'lvl5' ||
							item.type === 'lvl6') && (
							<div className="DocSearch-Hit-content-wrapper">
								<Snippet
									className="DocSearch-Hit-title"
									hit={item}
									attribute={`hierarchy.${item.type}`}
								/>
								<HitPath hit={item} />
							</div>
						)}

					{item.type === 'content' && (
						<div className="DocSearch-Hit-content-wrapper">
							<Snippet
								className="DocSearch-Hit-title"
								hit={item}
								attribute="content"
							/>
							<HitPath hit={item} />
						</div>
					)}

					{renderAction({
						item,
						runDeleteTransition,
						runFavoriteTransition
					})}
				</div>
			</Hit>
		</li>
	);
}
