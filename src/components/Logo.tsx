import {withBasePath} from '@/lib/utils';

export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
	return (
		<>
			{/* eslint-disable-next-line @next/next/no-img-element -- SVG logos do not need image optimization. */}
			<img
				className="hidden h-[23px] w-[190px] dark:block"
				src={withBasePath('/logo-theme-dark.svg')}
				alt="Sourcegraph Docs"
			/>
			{/* eslint-disable-next-line @next/next/no-img-element -- SVG logos do not need image optimization. */}
			<img
				className="block h-[23px] w-[190px] dark:hidden"
				src={withBasePath('/logo-theme-light.svg')}
				alt="Sourcegraph Docs"
			/>
		</>
	);
}
