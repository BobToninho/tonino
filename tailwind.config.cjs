const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
const typography = require('./tailwind.typography.cjs')

module.exports = {
	mode: 'jit',
	purge: ['./public/**/*.html', './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}'],
	theme: {
		colors: {
			transparent: 'transparent',
			white: '#fff',
			black: '#000',

			gray: colors.blueGray,
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
				900: 'hsl(0, 0%, 90%)'
			},
			primary: {
				600: 'var(--color-primary)'
			},
			foreground: 'var(--foreground)'
		},
		extend: {
			typography
		}
	},
	plugins: [require('@tailwindcss/typography')],
	corePlugins: {
		preflight: false
	}
}
