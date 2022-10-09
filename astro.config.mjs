import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import prefetch from '@astrojs/prefetch'

import cloudflare from '@astrojs/cloudflare'

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
		mdx(),
		prefetch(),
	],
	markdown: {
		syntaxHighlight: 'prism',
	},
	vite: {
		define: {
			__VERSION__: JSON.stringify(process.env.npm_package_version),
		},
	},
	output: 'server',
	adapter: cloudflare(),
})
