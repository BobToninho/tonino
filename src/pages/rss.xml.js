import rss, { pagesGlobToRssItems } from '@astrojs/rss'

export async function GET(context) {
	return rss({
		title: "Roberto Tonino's web corner",
		description: "Roberto Tonino's web corner",
		site: context.site,
		items: await pagesGlobToRssItems(import.meta.glob(['./blog/*.md', './blog/*.mdx'])),
		stylesheet: '/pretty-feed-v3.xsl',
		customData: `<language>en-us</language>`,
	})
}
