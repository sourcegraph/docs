import clsx from 'clsx';
import Link from 'next/link';

const variantStyles = {
	primary:
		'btn min-w-fit px-6 lg:px-4 btn-inverted-primary text-black focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 shadow-md ring ring-1 ring-sky-900/70 active:ring-sky-300/50 hover:ring-sky-900/10',
	xprimary:
		'rounded-full bg-link py-2 px-4 text-sm font-semibold text-black hover:bg-link-light focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-link-light',
	ghost:
		'w-full rounded-[5px] py-2 px-6 text-center text-slate-400 hover:text-white transition hover:text-white md:w-fit focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50',
	secondary:
		'rounded-full bg-slate-800 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-link'
};

type ButtonProps = {
	variant?: keyof typeof variantStyles;
} & (
		| React.ComponentPropsWithoutRef<typeof Link>
		| (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
	);

export function Button({
	variant = 'primary',
	className,
	...props
}: ButtonProps) {
	className = clsx(variantStyles[variant], className);

	return typeof props.href === 'undefined' ? (
		<button className={className} {...props} />
	) : (
		<Link className={className} {...props} />
	);
}
