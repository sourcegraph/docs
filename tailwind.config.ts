import typographyPlugin from '@tailwindcss/typography';
import {type Config} from 'tailwindcss';
const colors = require('tailwindcss/colors');

export default {
	content: ['./src/**/*.{js,jsx,ts,tsx,md}'],
	darkMode: 'class',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		fontSize: {
			xs: ['0.75rem', {lineHeight: '1rem'}],
			sm: ['0.875rem', {lineHeight: '1.5rem'}],
			base: ['1rem', {lineHeight: '2rem'}],
			lg: ['1.125rem', {lineHeight: '1.75rem'}],
			xl: ['1.25rem', {lineHeight: '2rem'}],
			'2xl': ['1.5rem', {lineHeight: '2.5rem'}],
			'3xl': ['2rem', {lineHeight: '2.5rem'}],
			'4xl': ['2.5rem', {lineHeight: '3rem'}],
			'5xl': ['3rem', {lineHeight: '3.5rem'}],
			'6xl': ['3.75rem', {lineHeight: '1'}],
			'7xl': ['4.5rem', {lineHeight: '1'}],
			'8xl': ['6rem', {lineHeight: '1'}],
			'9xl': ['8rem', {lineHeight: '1'}]
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			// Primary Vermilion Colors
			vermilion: {
				'00': '#060000',
				'01': '#200302',
				'02': '#410604',
				'07': '#F34E3F', // Hero color
				'08': '#FF7867',
				'11': '#FFF3F0'
			},
			// Secondary Violet Colors
			violet: {
				'00': '#030106',
				'01': '#120720',
				'02': '#291242',
				'06': '#914BDC',
				'07': '#A96AF3',
				'08': '#BE8CFF',
				'11': '#FAF4FF'
			},
			// Secondary Teal Colors
			teal: {
				'00': '#000204',
				'01': '#001118',
				'02': '#002533',
				'07': '#00A0C8',
				'08': '#4DB8DA',
				'11': '#EAFCFF'
			},
			// Theme colors
			'dark-bg': '#060000', // Vermilion-00
			'light-bg': '#fffcfc',
			link: {
				light: '#F34E3F', // Teal-07
				DEFAULT: '#FF7867' // Teal-08
			},
			'link-underline': '#606060', // Teal-02
			'link-underline-light': '#EAFCFF', // Teal-11
			// Brand Colors
			black: '#060000',
			white: colors.white,
			'dark-bg-1': '#0e0808', // Vermilion-01
			'dark-bg-2': '#0e0808', // Vermilion-02
			'light-bg-1': '#FFF',
			'light-bg-2': '#FFF3F0', // Vermilion-11
			'light-bg-3': '#FFF3F0', // Vermilion-11
			'dark-border': '#262B38',
			'dark-border-2': '#343A4C',
			'light-border': '#E6EBF2',
			'light-border-2': '#DBE2F0',
			'dark-text-muted': '#fff3f0', // Vermilion-08
			'light-text-muted': '#060000', // Vermilion-07
			'dark-text-primary': '#FFF3F0', // Vermilion-11
			'dark-text-secondary': '#A9A9A9',
			'dark-paragraph-text': '#FFF3F0',
			sggray: {
				100: '#F5F7FB',
				200: '#DBE2F0',
				300: '#A6B6D9',
				500: '#343A4D'
			},
			sgviolet: {
				300: '#CE9CFF',
				400: '#6112A3',
				500: '#A112FF',
				600: '#6112A3',
				700: '#270741',
				800: '#1E0632'
			},
			blurple: '#DBDBFF',
			// Tailwind colors
			gray: colors.gray,
			amber: colors.amber,
			red: colors.red,
			sky: colors.sky,
			cyan: colors.cyan,
			blue: colors.blue,
			purple: colors.purple,
			indigo: colors.indigo,
			slate: colors.slate,
			yellow: colors.yellow,
			// Shades of Purple code theme,
			sop: {
				100: '#A599E9',
				500: '#4D21FC',
				700: '#2D2B55',
				800: '#1E1E3F'
			}
		},
		extend: {
			fontFamily: {
				sans: ['var(--font-polysans)', 'system-ui'],
				display: [
					'var(--font-polysans)',
					{fontFeatureSettings: '"ss01"'}
				],
				mono: [
					'var(--font-polysans-mono)',
					'ui-monospace',
					'Menlo',
					'Monaco',
					'Consolas',
					'Liberation Mono',
					'Courier New',
					'monospace'
				]
			},
			fontWeight: {
				bulky: '700',
				mono: '500',
				slim: '400',
				thin: '300'
			},
			maxWidth: {
				'8xl': '88rem'
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {height: '0'},
					to: {height: 'var(--radix-accordion-content-height)'}
				},
				'accordion-up': {
					from: {height: 'var(--radix-accordion-content-height)'},
					to: {height: '0'}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			borderWidth: {
				'0.1': '0.1px'
			}
		}
	},
	plugins: [typographyPlugin, require('tailwindcss-animate')]
} satisfies Config;
