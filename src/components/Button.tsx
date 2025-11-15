import clsx from 'clsx';
import Link from 'next/link';

const variantStyles = {
	primary:
		'block min-w-fit transition-colors font-semibold px-4 py-2 rounded-[4px] bg-vermilion-07 text-vermilion-11 shadow-md hover:bg-vermilion-08',
	ghost: 'min-w-fit block py-2 px-4 text-center text-vermilion-07 hover:text-vermilion-08 transition',
	secondary:
		'rounded-full bg-violet-07 py-2 px-4 text-sm font-medium text-violet-11 hover:bg-violet-08 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-11/50 active:text-teal-07'
};

const globalStyles =
	'focus:outline-none text-xs sm:text-sm md:text-base focus-visible:outline-2 dark:focus-visible:outline-vermilion-11/50 focus-visible:outline-vermilion-00/50';

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
