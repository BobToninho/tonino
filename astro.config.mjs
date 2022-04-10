import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
	site: 'https://tonino.xyz',
	integrations: [sitemap()],
	vite: {
		define: {
			__VERSION__: JSON.stringify(process.env.npm_package_version),
		},
	},
})
