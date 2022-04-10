import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
	site: 'https://tonino.xyz',
	integrations: [
		sitemap(),
		tailwind({
			config: {
				applyAstroPreset: false,
			},
		}),
	],
	markdown: {
		syntaxHighlight: 'prism',
	},
	vite: {
		define: {
			__VERSION__: JSON.stringify(process.env.npm_package_version),
		},
	},
})
