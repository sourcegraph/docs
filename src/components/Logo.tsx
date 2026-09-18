import Image from 'next/image';

// Imported, not served from `public/`, so the files get content-hashed
// `/_next/static/media/` URLs that the CDN caches immutably.
import logoDark from '@/images/logo-theme-dark.svg';
import logoLight from '@/images/logo-theme-light.svg';

export function Logo() {
	return (
		<>
			<Image
				className="hidden h-[23px] w-[190px] dark:block"
				src={logoDark}
				alt="Sourcegraph Docs"
				priority
			/>
			<Image
				className="block h-[23px] w-[190px] dark:hidden"
				src={logoLight}
				alt="Sourcegraph Docs"
				priority
			/>
		</>
	);
}
