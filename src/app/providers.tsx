'use client';

import {ThemeProvider} from 'next-themes';
import {
	SearchProvider,
	SearchConfig
} from '../components/search/SearchProvider';
import {searchMetadata} from '@/data/search';

export function Providers({children}: {children: React.ReactNode}) {
	return (
		<ThemeProvider attribute="class" disableTransitionOnChange>
			<SearchProvider searchConfig={searchMetadata as SearchConfig}>
				{children}
			</SearchProvider>
		</ThemeProvider>
	);
}
