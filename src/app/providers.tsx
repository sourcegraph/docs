'use client';

import { ThemeProvider } from "@/components/theme-provider";
import { searchMetadata } from '@/data/search';
import {
	SearchConfig,
	SearchProvider
} from '../components/search/SearchProvider';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		// <ThemeProvider attribute="class" disableTransitionOnChange>
		<ThemeProvider
			enableSystem
			attribute="class"
			defaultTheme="system"
			disableTransitionOnChange
		>
			<SearchProvider searchConfig={searchMetadata as SearchConfig}>
				{children}
			</SearchProvider>
		</ThemeProvider>
	);
}
