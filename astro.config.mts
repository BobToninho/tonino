import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import prefetch from '@astrojs/prefetch'
import pkg from './package.json' // https://astro.build/config

import image from '@astrojs/image'

// https://astro.build/config
export default defineConfig({
	site: 'https://tonino.xyz',
	integrations: [sitemap(), tailwind(), mdx(), prefetch(), image()],
	markdown: {
		syntaxHighlight: 'prism',
	},
	vite: {
		define: {
			__VERSION__: JSON.stringify(pkg.version),
		},
	},
})
