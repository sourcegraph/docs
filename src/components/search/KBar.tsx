import {useState, useEffect, FC, ReactNode} from 'react';
import type {Action} from 'kbar';
import {KBarProvider} from 'kbar';
import {useRouter} from 'next/navigation.js';
import {KBarModal} from './KBarModal';
import {CoreContent, MDXDocument} from '../../utils/contentlayer';

export interface KBarSearchProps {
	searchDocumentsPath: string | false;
	defaultActions?: Action[];
	onSearchDocumentsLoad?: (json: any) => Action[];
}

export interface KBarConfig {
	provider: 'kbar';
	kbarConfig: KBarSearchProps;
}

/**
 * Command palette like search component with kbar - `ctrl-k` to open the palette.
 *
 * Default actions can be overridden by passing in an array of actions to `defaultActions`.
 * To load actions dynamically, pass in a `searchDocumentsPath` to a JSON file.
 * `onSearchDocumentsLoad` can be used to transform the JSON into actions.
 *
 * To toggle the modal or search from child components, use the search context:
 * ```
 * import { useKBar } from 'kbar'
 * const { query } = useKBar()
 * ```
 * See https://github.com/timc1/kbar/blob/main/src/types.ts#L98-L106 for typings.
 *
 * @param {*} { kbarConfig, children }
 * @return {*}
 */
export const KBarSearchProvider: FC<{
	children: ReactNode;
	kbarConfig: KBarSearchProps;
}> = ({kbarConfig, children}) => {
	const router = useRouter();
	const {searchDocumentsPath, defaultActions, onSearchDocumentsLoad} =
		kbarConfig;
	const [searchActions, setSearchActions] = useState<Action[]>([]);
	const [dataLoaded, setDataLoaded] = useState(false);

	useEffect(() => {
		const mapPosts = (posts: CoreContent<MDXDocument>[]) => {
			const actions: Action[] = [];
			for (const post of posts) {
				try {
					if (post.headings && post.headings.length > 0) {
						actions.push({
							id: post.url,
							name: post.headings[0].title,
							subtitle: post.url,
							keywords:
								post?.headings?.map(
									(heading: any) => heading.title
								) || '',
							section: 'Docs',
							perform: () => router.push('/' + post.url)
						});
					}
				} catch (e) {
					console.log(
						e,
						'Error indexing the following post in search: ',
						post
					);
				}
			}
			return actions;
		};
		async function fetchData() {
			if (searchDocumentsPath) {
				const url =
					searchDocumentsPath.indexOf('://') > 0 ||
					searchDocumentsPath.indexOf('//') === 0
						? searchDocumentsPath
						: new URL(searchDocumentsPath, window.location.origin);
				const res = await fetch(url);
				const json = await res.json();
				const actions = onSearchDocumentsLoad
					? onSearchDocumentsLoad(json)
					: mapPosts(json);
				setSearchActions(actions);
				setDataLoaded(true);
			}
		}
		if (!dataLoaded && searchDocumentsPath) {
			fetchData();
		} else {
			setDataLoaded(true);
		}
	}, [
		defaultActions,
		dataLoaded,
		router,
		searchDocumentsPath,
		onSearchDocumentsLoad
	]);

	return (
		<KBarProvider actions={defaultActions}>
			<KBarModal actions={searchActions} isLoading={!dataLoaded} />
			{children}
		</KBarProvider>
	);
};
