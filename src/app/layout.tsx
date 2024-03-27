import { Providers } from '@/app/providers';
import { Layout } from '@/components/Layout';
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
			<head>
				{/* Add Google Tag Manager script to head */}
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-TB4NLS7');`
					}}
				/>
			</head>

			<body
				suppressHydrationWarning
				className="flex min-h-full bg-light-bg dark:bg-dark-bg"
			>
				{/* Add Google Tag Manager noscript iframe */}
				<noscript
					dangerouslySetInnerHTML={{
						__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TB4NLS7"
                        height="0" width="0" style="display:none;visibility:hidden"></iframe>`
					}}
				/>

				<Providers>
					<Layout>{children}</Layout>
				</Providers>
			</body>
		</html>
	);
}
