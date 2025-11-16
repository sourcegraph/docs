import * as React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/lib/utils';

const badgeVariants = cva(
	'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
	{
		variants: {
			variant: {
				default:
					'border-transparent bg-vermilion-07 text-vermilion-11 hover:bg-vermilion-08',
				secondary:
					'border-transparent bg-violet-07 text-violet-11 hover:bg-violet-08',
				destructive:
					'border-transparent bg-vermilion-02 text-vermilion-11 hover:bg-vermilion-01',
				outline: 'text-foreground'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	}
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {
	backgroundColor?: string;
	textColor?: string;
	textSize?:
		| 'text-xs'
		| 'text-sm'
		| 'text-base'
		| 'text-lg'
		| 'text-xl'
		| 'text-2xl';
}

function Badge({
	className,
	variant,
	backgroundColor,
	textColor,
	textSize = 'text-xs',
	...props
}: BadgeProps) {
	return (
		<div
			className={cn(
				badgeVariants({variant}),
				className,
				backgroundColor,
				textColor,
				textSize
			)}
			style={{
				backgroundColor: backgroundColor,
				color: textColor
			}}
			{...props}
		/>
	);
}

export {Badge, badgeVariants};
