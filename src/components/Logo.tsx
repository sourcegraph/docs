export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
	return (
		<>
			<img
				className="hidden h-[23px] w-[190px] dark:block"
				src="/logo-theme-dark.svg"
				alt="Sourcegraph Docs"
			/>
			<img
				className="block h-[23px] w-[190px] dark:hidden"
				// src="/docs/logo-theme-light.svg"
				src="/logo-theme-light.svg"
				alt="Sourcegraph Docs"
			/>
		</>
	);
}
