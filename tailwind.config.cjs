const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
const typographyConfig = require('./tailwind.typography.cjs')

/** @type {import("tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
	content: ['./public/**/*.html', './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}'],
	theme: {
		container: {
			center: true,
		},
		colors: {
			transparent: 'transparent',
			white: '#fff',
			black: '#000',

			gray: colors.slate,
			blue: colors.blue,
			grayscale: {
				100: 'hsl(0, 0%, 10%)',
				200: 'hsl(0, 0%, 20%)',
				300: 'hsl(0, 0%, 30%)',
				400: 'hsl(0, 0%, 40%)',
				500: 'hsl(0, 0%, 50%)',
				600: 'hsl(0, 0%, 60%)',
				700: 'hsl(0, 0%, 70%)',
				800: 'hsl(0, 0%, 80%)',
				900: 'hsl(0, 0%, 90%)',
			},
			primary: {
				600: 'var(--color-primary)',
			},
			foreground: 'var(--foreground)',
		},
		extend: {
			typography: typographyConfig,
		},
	},
	plugins: [require('@tailwindcss/typography')],
	corePlugins: {
		preflight: false,
	},
}
