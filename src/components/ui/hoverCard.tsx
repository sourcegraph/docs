'use client';

import {forwardRef, ElementRef, ComponentPropsWithoutRef} from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';

import {cn} from '@/lib/utils';

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = forwardRef<
	ElementRef<typeof HoverCardPrimitive.Content>,
	ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({className, align = 'center', sideOffset = 4, ...props}, ref) => (
	<HoverCardPrimitive.Content
		ref={ref}
		align={align}
		sideOffset={sideOffset}
		className={cn(
			'z-50 flex max-w-[400px] flex-col rounded-md bg-white p-4 shadow-md',
			className
		)}
		{...props}
	/>
));

HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export {HoverCard, HoverCardTrigger, HoverCardContent};
