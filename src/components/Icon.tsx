import {useId} from 'react';
import clsx from 'clsx';

import {InstallationIcon} from '@/components/icons/InstallationIcon';
import {LightbulbIcon} from '@/components/icons/LightbulbIcon';
import {PresetsIcon} from '@/components/icons/PresetsIcon';
import {ThemingIcon} from '@/components/icons/ThemingIcon';
import {WarningIcon} from '@/components/icons/WarningIcon';
import {CodyIcon} from '@/components/icons/CodyIcon';
import {CodeSearchIcon} from './icons/CodeSearchIcon';
import {PluginsIcon} from './icons/PuginsIcon';
import {CodeGraphIcon} from './icons/CodeGraphIcon';
import {LanguageModelsIcon} from './icons/LanguageModels';
import {SecurityIcon} from './icons/SecurityIcon';
import {CodebaseIcon} from './icons/CodebaseIcon';

const icons = {
	installation: InstallationIcon,
	presets: PresetsIcon,
	theming: ThemingIcon,
	lightbulb: LightbulbIcon,
	warning: WarningIcon,
	plugins: PluginsIcon,
	cody: CodyIcon,
	codesearch: CodeSearchIcon,
	codegraph: CodeGraphIcon,
	languagemodels: LanguageModelsIcon,
	security: SecurityIcon,
	codebase: CodebaseIcon
};

const iconStyles = {
	blue: '[--icon-foreground:theme(colors.slate.900)] [--icon-background:theme(colors.white)]',
	amber: '[--icon-foreground:theme(colors.amber.900)] [--icon-background:theme(colors.amber.100)]'
};

export function Icon({
	icon,
	color = 'blue',
	className,
	...props
}: {
	color?: keyof typeof iconStyles;
	icon: keyof typeof icons;
} & Omit<React.ComponentPropsWithoutRef<'svg'>, 'color'>) {
	let id = useId();
	let IconComponent = icons[icon];

	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 32 32"
			fill="none"
			className={clsx(className, iconStyles[color])}
			{...props}
		>
			<IconComponent id={id} color={color} />
		</svg>
	);
}

const gradients = {
	blue: [
		{stopColor: '#A112FF', offset: '.127'},
		{stopColor: '#FF5543', offset: '.6'},
		{stopColor: '#00CBEC', offset: 1}
	],
	amber: [
		{stopColor: '#FDE68A', offset: '.08'},
		{stopColor: '#F59E0B', offset: '.837'}
	]
};

export function Gradient({
	color = 'blue',
	...props
}: {
	color?: keyof typeof gradients;
} & Omit<React.ComponentPropsWithoutRef<'radialGradient'>, 'color'>) {
	return (
		<radialGradient
			cx={0}
			cy={0}
			r={1}
			gradientUnits="userSpaceOnUse"
			{...props}
		>
			{gradients[color].map((stop, stopIndex) => (
				<stop key={stopIndex} {...stop} />
			))}
		</radialGradient>
	);
}
