import { Providers } from '@/app/providers';
import { Layout } from '@/components/Layout';
import { GoogleAnalytics } from '@next/third-parties/google';
import clsx from 'clsx';
import config from 'docs.config';
import { type Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import Chatbot from '@/components/ChatBot';

import '@langbase/components/styles'
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
	metadataBase: new URL('https://sourcegraph.com'),
	title: {
		template: '%s - Sourcegraph docs',
		default: 'Sourcegraph docs'
	},
	description: 'Documentation for Sourcegraph, the code intelligence platform.',
	other: {
		"docsearch:language": "en",
		"docsearch:version": `v${config.DOCS_LATEST_VERSION}`
	},
	alternates: {
		canonical: '/docs'
	},
	openGraph: {
		images: [{url: 'https://sourcegraph.com/docs/sourcegraph-docs-c.png'}]
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
		<head>
			<link
				rel="alternate"
				type="application/rss+xml"
				title="RSS Feed for Sourcegraph"
				href="/technical-changelog.rss"
			/>
		</head>
		<body
			suppressHydrationWarning
			className="flex min-h-full bg-light-bg dark:bg-dark-bg"
			>
				<Providers>
					{/* <Chatbot /> */}
					<Layout>{children}</Layout>
				</Providers>
			</body>
			<GoogleAnalytics gaId="GTM-TB4NLS7" />
		</html>
	);
}
