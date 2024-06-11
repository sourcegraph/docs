import {usePathname} from 'next/navigation'

export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
	const pathname = usePathname()
	const docs = extractDocsPath(pathname)

	function extractDocsPath(str: string) {
    const match = str.match(/^\/docs(?=\/|$)/);
    return match ? match[0] : '';
	}

	return (
		<>
			<img
				className="hidden h-[23px] w-[190px] dark:block"
				src={`${docs}/logo-theme-dark.svg`}
				alt="Sourcegraph Docs"
			/>
			<img
				className="block h-[23px] w-[190px] dark:hidden"
				src={`${docs}/logo-theme-light.svg`}
				alt="Sourcegraph Docs"
			/>
		</>
	);
}
