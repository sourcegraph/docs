export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
	const basePath = process.env.VERCEL_ENV === 'production' ? '/docs' : '';

	return (
		<>
			<img
				className="hidden h-[23px] w-[190px] dark:block"
				src={`${basePath}/logo-theme-dark.svg`}
				alt="Sourcegraph Docs"
			/>
			<img
				className="block h-[23px] w-[190px] dark:hidden"
				src={`${basePath}/logo-theme-light.svg`}
				alt="Sourcegraph Docs"
			/>
		</>
	);
}
