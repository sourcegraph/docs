import typographyPlugin from '@tailwindcss/typography'
import { type Config } from 'tailwindcss'
const colors = require('tailwindcss/colors')

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,md}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '2rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2.5rem' }],
      '3xl': ['2rem', { lineHeight: '2.5rem' }],
      '4xl': ['2.5rem', { lineHeight: '3rem' }],
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      // Docs colors
      'dark-bg': '#14171F',
      'light-bg': '#F9FAFB',
      'link': {
        light: '#3098aa',
        DEFAULT: '#62BECC',
      },
      'link-underline': '#2a7c90',
      'link-underline-light': '#00CBEC',
      violet: {
        100: '#EEDFFF',
        200: '#E8D1FF',
        300: '#CE9CFF',
        400: '#A112FF',
        500: '#820DDE',
        600: '#6112A3',
        700: '#270741',
        750: '#1e0632',
        800: '#160425',
      },
      // Brand Colors
      black: '#0F111A',
      white: colors.white,
      'dark-bg-1': '#181B26',
      'dark-bg-2': '#1D212F',
      'dark-bg-3': '#343A4D',
      'light-bg-1': '#FFF',
      'light-bg-2': '#E6EBF2',
      'light-bg-3': '#DBE2F0',
      'dark-border': '#262B38',
      'dark-border-2': '#343A4C',
      'light-border': '#E6EBF2',
      'light-border-2': '#DBE2F0',
      'dark-text-muted': '#A6B6D9',
      'light-text-muted': '#5E6E8C',
      'sggray': {
        100: '#F5F7FB',
        200: '#DBE2F0',
        300: '#A6B6D9',
        500: '#343A4D',
      },
      'sgviolet': {
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
        800: '#1E1E3F',
      }
    },
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'var(--font-inter)'],
        display: ['var(--font-lexend)', { fontFeatureSettings: '"ss01"' }],
        mono: ['SFMono-Regular', 'ui-monospace', 'Menlo', 'Monaco', 'Consolas', "Liberation Mono", "Courier New", 'monospace']
      },
      maxWidth: {
        '8xl': '88rem',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [typographyPlugin, require("tailwindcss-animate")],
} satisfies Config
