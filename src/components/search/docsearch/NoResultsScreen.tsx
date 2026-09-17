import React from 'react';
import {productFilterLinks} from '../../../data/search';

import type {ScreenStateProps} from './ScreenState';
import type {InternalDocSearchHit} from './types';

export type NoResultsScreenTranslations = Partial<{
	noResultsText: string;
	suggestedQueryText: string;
	reportMissingResultsText: string;
	reportMissingResultsLinkText: string;
}>;

type NoResultsScreenProps = Omit<
	ScreenStateProps<InternalDocSearchHit>,
	'translations'
> & {
	translations?: NoResultsScreenTranslations;
};

const basePath = process.env.NEXT_PUBLIC_DOCS_BASE_PATH || '';

export function NoResultsScreen({
	translations = {},
	...props
}: NoResultsScreenProps) {
	const {
		noResultsText = 'No results for',
		suggestedQueryText = 'Try searching for',
		reportMissingResultsText = 'Believe this query should return results?',
		reportMissingResultsLinkText = 'Let us know.'
	} = translations;
	const searchSuggestions: string[] | undefined = props.state.context
		.searchSuggestions as string[];
	const linkedSuggestions = searchSuggestions
		?.map(title => ({title, href: productFilterLinks[title]}))
		.filter(suggestion => suggestion.href)
		.slice(0, 3);

	return (
		<div className="DocSearch-NoResults">
			{/* <div className="DocSearch-Screen-Icon flex self-center">
        <NoResultsIcon />
      </div> */}
			<p className="DocSearch-Title">
				{noResultsText} "<strong>{props.state.query}</strong>"
			</p>

			{linkedSuggestions && linkedSuggestions.length > 0 && (
				<div className="DocSearch-NoResults-Prefill-List">
					<p className="DocSearch-Help">
						{suggestedQueryText} these products:
					</p>
					<ul>
						{linkedSuggestions.map(suggestion => (
							<li key={suggestion.title}>
								<a
									className="DocSearch-Prefill"
									href={basePath + suggestion.href}
								>
									{suggestion.title}
								</a>
							</li>
						))}
					</ul>
				</div>
			)}

			{props.getMissingResultsUrl && (
				<p className="DocSearch-Help">
					{`${reportMissingResultsText} `}
					<a
						href={props.getMissingResultsUrl({
							query: props.state.query
						})}
						target="_blank"
						rel="noopener noreferrer"
					>
						{reportMissingResultsLinkText}
					</a>
				</p>
			)}
		</div>
	);
}
