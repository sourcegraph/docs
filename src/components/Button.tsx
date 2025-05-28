import clsx from 'clsx';
import Link from 'next/link';

const variantStyles = {
	primary:
		'block min-w-fit transition-colors font-semibold px-4 py-2 rounded-[4px] bg-violet-700 dark:bg-white text-white dark:text-violet-700 dark:shadow-none shadow-md hover:bg-white hover:text-violet-700 dark:hover:bg-violet-700 dark:hover:text-white',
	ghost: 'min-w-fit block py-2 px-4 text-center text-violet-700 dark:text-slate-400 hover:text-violet-600 dark:hover:text-white transition',
	secondary:
		'rounded-full bg-slate-800 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-link'
};

const globalStyles =
	'focus:outline-none text-xs sm:text-sm md:text-base focus-visible:outline-2 dark:focus-visible:outline-white/50 focus-visible:outline-black/50';

type ButtonProps = {
	variant?: keyof typeof variantStyles;
} & (
	| React.ComponentPropsWithoutRef<typeof Link>
	| (React.ComponentPropsWithoutRef<'button'> & {href?: undefined})
);

export function Button({
	variant = 'primary',
	className,
	...props
}: ButtonProps) {
	className = clsx(variantStyles[variant], globalStyles, className);

	return typeof props.href === 'undefined' ? (
		<button className={className} {...props} />
	) : (
		<Link className={className} {...props} />
	);
}
