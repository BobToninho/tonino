import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import prefetch from '@astrojs/prefetch'

// https://astro.build/config
export default defineConfig({
	site: 'https://www.tonino.xyz',
	integrations: [sitemap(), tailwind(), mdx(), prefetch()],
	markdown: {
		syntaxHighlight: 'shiki',
	},
})
