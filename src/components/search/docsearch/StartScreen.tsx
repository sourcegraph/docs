import {RecentIcon} from './icons/RecentIcon';
import {ResetIcon} from './icons/ResetIcon';
import {StarIcon} from './icons/StarIcon';
import {curatedSearchSuggestions} from '../../../data/search';
import {withBasePath} from '@/lib/utils';

import {Results} from './Results';
import type {ScreenStateProps} from './ScreenState';
import type {InternalDocSearchHit} from './types';

export type StartScreenTranslations = Partial<{
	recentSearchesTitle: string;
	noRecentSearchesText: string;
	saveRecentSearchButtonTitle: string;
	removeRecentSearchButtonTitle: string;
	favoriteSearchesTitle: string;
	removeFavoriteSearchButtonTitle: string;
}>;

type StartScreenProps = Omit<
	ScreenStateProps<InternalDocSearchHit>,
	'translations'
> & {
	hasCollections: boolean;
	translations?: StartScreenTranslations;
};

function Suggestions() {
	return (
		<section
			className="DocSearch-Suggestions"
			aria-labelledby="search-suggestions"
		>
			<div className="DocSearch-Hit-source" id="search-suggestions">
				Suggestions
			</div>
			<ul>
				{curatedSearchSuggestions.map(suggestion => (
					<li key={suggestion.href}>
						<a href={withBasePath(suggestion.href)}>
							<span className="DocSearch-Suggestion-title">
								{suggestion.title}
							</span>
							<span className="DocSearch-Suggestion-description">
								{suggestion.description}
							</span>
						</a>
					</li>
				))}
			</ul>
		</section>
	);
}

export function StartScreen({translations = {}, ...props}: StartScreenProps) {
	const {
		recentSearchesTitle = 'Recent',
		noRecentSearchesText = 'No recent searches',
		saveRecentSearchButtonTitle = 'Save this search',
		removeRecentSearchButtonTitle = 'Remove this search from history',
		favoriteSearchesTitle = 'Favorite',
		removeFavoriteSearchButtonTitle = 'Remove this search from favorites'
	} = translations;
	if (props.state.status === 'idle' && props.hasCollections === false) {
		return (
			<div className="DocSearch-Dropdown-Container">
				<Suggestions />
				{!props.disableUserPersonalization && (
					<p className="DocSearch-Help DocSearch-NoRecent">
						{noRecentSearchesText}
					</p>
				)}
			</div>
		);
	}

	if (props.hasCollections === false) {
		return null;
	}

	return (
		<div className="DocSearch-Dropdown-Container">
			<Suggestions />
			<Results
				{...props}
				title={recentSearchesTitle}
				collection={props.state.collections[0]}
				renderIcon={() => (
					<div className="DocSearch-Hit-icon">
						<RecentIcon />
					</div>
				)}
				renderAction={({
					item,
					runFavoriteTransition,
					runDeleteTransition
				}) => (
					<>
						<div className="DocSearch-Hit-action">
							<button
								className="DocSearch-Hit-action-button"
								title={saveRecentSearchButtonTitle}
								type="submit"
								onClick={event => {
									event.preventDefault();
									event.stopPropagation();
									runFavoriteTransition(() => {
										props.favoriteSearches.add(item);
										props.recentSearches.remove(item);
										props.refresh();
									});
								}}
							>
								<StarIcon />
							</button>
						</div>
						<div className="DocSearch-Hit-action">
							<button
								className="DocSearch-Hit-action-button"
								title={removeRecentSearchButtonTitle}
								type="submit"
								onClick={event => {
									event.preventDefault();
									event.stopPropagation();
									runDeleteTransition(() => {
										props.recentSearches.remove(item);
										props.refresh();
									});
								}}
							>
								<ResetIcon />
							</button>
						</div>
					</>
				)}
			/>

			<Results
				{...props}
				title={favoriteSearchesTitle}
				collection={props.state.collections[1]}
				renderIcon={() => (
					<div className="DocSearch-Hit-icon">
						<StarIcon />
					</div>
				)}
				renderAction={({item, runDeleteTransition}) => (
					<div className="DocSearch-Hit-action">
						<button
							className="DocSearch-Hit-action-button"
							title={removeFavoriteSearchButtonTitle}
							type="submit"
							onClick={event => {
								event.preventDefault();
								event.stopPropagation();
								runDeleteTransition(() => {
									props.favoriteSearches.remove(item);
									props.refresh();
								});
							}}
						>
							<ResetIcon />
						</button>
					</div>
				)}
			/>
		</div>
	);
}
