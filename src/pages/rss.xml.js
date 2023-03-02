import rss, { pagesGlobToRssItems } from '@astrojs/rss'

export async function get(context) {
	return rss({
		title: "Roberto Tonino's web corner",
		description: "Roberto Tonino's web corner",
		site: context.site,
		items: await pagesGlobToRssItems(import.meta.glob('./blog/*.{md, mdx}')),
		customData: '<language>en-us</language>',
	})
}
