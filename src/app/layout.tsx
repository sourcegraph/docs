import { Providers } from '@/app/providers';
import { Layout } from '@/components/Layout';
import { GoogleAnalytics } from '@next/third-parties/google';
import clsx from 'clsx';
import config from 'docs.config';
import { type Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';



import '@/styles/tailwind.css';

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter'
});

// Use local version of Lexend so that we can use OpenType features
const lexend = localFont({
	src: '../fonts/lexend.woff2',
	display: 'swap',
	variable: '--font-lexend'
});

export const metadata: Metadata = {
	title: {
		template: '%s - Sourcegraph Docs',
		default: 'Sourcegraph - Docs'
	},
	description: 'Sourcegraph Documentation',
	other: {
		"docsearch:language": "en",
		"docsearch:version": `v${config.DOCS_LATEST_VERSION}`

	}
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="en"
			style={{ colorScheme: 'dark' }}
			className={clsx(
				'h-full antialiased',
				inter.variable,
				lexend.variable
			)}
			suppressHydrationWarning
		>
			<body
				suppressHydrationWarning
				className="flex min-h-full bg-light-bg dark:bg-dark-bg"
			>
				<Providers>
					<Layout>{children}</Layout>
				</Providers>
			</body>
			<GoogleAnalytics gaId="GTM-TB4NLS7" />
		</html>
	);
}
