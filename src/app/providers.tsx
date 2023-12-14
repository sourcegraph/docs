'use client';

import { searchMetadata } from '@/data/search';
import { ThemeProvider } from 'next-themes';
import {
	SearchConfig,
	SearchProvider
} from './components/search/SearchProvider';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" disableTransitionOnChange>
			<SearchProvider searchConfig={searchMetadata as SearchConfig}>
				{children}
			</SearchProvider>
		</ThemeProvider>
	);
}
