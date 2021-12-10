// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing "@ts-check" and `@type` comments below.

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
	buildOptions: {
		site: 'https://tonino.xyz', // Your public domain, e.g.: https://my-site.dev/. Used to generate sitemaps and canonical URLs.
		sitemap: true, // Generate sitemap (set to "false" to disable)
	},
	devOptions: {},
	renderers: ['@astrojs/renderer-vue'],
	vite: {
		define: {
			__VERSION__: JSON.stringify(process.env.npm_package_version),
		},
	},
})
