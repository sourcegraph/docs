import {type Metadata} from 'next';
import {Inter} from 'next/font/google';
import localFont from 'next/font/local';
import clsx from 'clsx';
import {Providers} from '@/app/providers';
import {Layout} from '@/components/Layout';

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
	description: 'Sourcegraph Documentation'
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html
			lang="en"
			style={{colorScheme: 'dark'}}
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
		</html>
	);
}
