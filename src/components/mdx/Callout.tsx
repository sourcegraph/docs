import clsx from 'clsx';

import {
	InformationCircleIcon,
	LightBulbIcon,
	ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const styles = {
	note: {
		container:
			'border-sky-500/20 bg-sky-50/50 dark:border-sky-500/30 dark:bg-sky-500/10',
		icon: 'text-sky-500',

		body: 'text-sky-800 [--tw-prose-background:theme(colors.sky.50)] prose-a:text-sky-900 prose-code:text-sky-900 dark:text-slate-300 dark:prose-code:text-slate-300'
	},
	info: {
		container:
			'dark:bg-slate-900 border-slate-300 dark:border-slate-200/20',
		icon: 'text-inherit',
		body: 'text-sky-800 [--tw-prose-background:theme(colors.sky.50)] prose-a:text-sky-900 prose-code:text-sky-900 dark:text-slate-300 dark:prose-code:text-slate-300'
	},
	tip: {
		container:
			'border-sky-500/20 bg-sky-50/50 dark:border-sky-500/30 dark:bg-sky-500/10',
		icon: 'text-sky-500',
		body: 'text-sky-800 [--tw-prose-background:theme(colors.sky.50)] prose-a:text-sky-900 prose-code:text-sky-900 dark:text-slate-300 dark:prose-code:text-slate-300'
	},
	warning: {
		container:
			'border-amber-500/20 bg-amber-50/50 dark:border-amber-500/30 dark:bg-amber-500/10',
		icon: 'text-amber-500',
		body: 'text-amber-800 [--tw-prose-underline:theme(colors.amber.400)] [--tw-prose-background:theme(colors.amber.50)] prose-a:text-amber-900 prose-code:text-amber-900 dark:text-slate-300 dark:[--tw-prose-underline:theme(colors.sky.700)] dark:prose-code:text-slate-300'
	}
};

const icons = {
	note: (props: {className?: string}) => (
		<InformationCircleIcon className={props.className} />
	),
	info: (props: {className?: string}) => (
		<InformationCircleIcon className={props.className} />
	),
	tip: (props: {className?: string}) => (
		<LightBulbIcon className={props.className} />
	),
	warning: (props: {className?: string}) => (
		<ExclamationTriangleIcon className={props.className} />
	)
};

export function Callout({
	children,
	type = 'note'
}: {
	title?: string;
	children: React.ReactNode;
	type?: keyof typeof styles;
}) {
	let IconComponent = icons[type];

	return (
		<div
			className={clsx(
				'mb-4 overflow-hidden rounded-xl border px-5 py-4',
				styles[type].container
			)}
		>
			<div className="flex items-center space-x-3">
				<IconComponent className={clsx(styles[type].icon, 'h-5 w-5')} />
				<div
					className={clsx(
						'prose flex-1 overflow-x-auto text-sm',
						styles[type].body
					)}
				>
					{children}
				</div>
			</div>
		</div>
	);
}
