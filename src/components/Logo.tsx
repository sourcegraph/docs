export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
	const basePath = process.env.NEXT_PUBLIC_DOCS_BASE_PATH || '';

	return (
		<>
			{/* eslint-disable-next-line @next/next/no-img-element -- SVG logos do not need image optimization. */}
			<img
				className="hidden h-[23px] w-[190px] dark:block"
				src={`${basePath}/logo-theme-dark.svg`}
				alt="Sourcegraph Docs"
			/>
			{/* eslint-disable-next-line @next/next/no-img-element -- SVG logos do not need image optimization. */}
			<img
				className="block h-[23px] w-[190px] dark:hidden"
				src={`${basePath}/logo-theme-light.svg`}
				alt="Sourcegraph Docs"
			/>
		</>
	);
}
