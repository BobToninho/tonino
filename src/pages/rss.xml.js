import rss, { pagesGlobToRssItems } from '@astrojs/rss'
import sanitizeHtml from 'sanitize-html'

export async function get(context) {
	const blogImportResult = await import.meta.glob('./blog/*.{md, mdx}', { eager: true })
	const blogPosts = Object.values(blogImportResult)

	return rss({
		title: "Roberto Tonino's web corner",
		description: "Roberto Tonino's web corner",
		site: context.site,
		items: blogPosts.map(post => ({
			link: post.url,
			content: sanitizeHtml(post.compiledContent()),
			...post.frontmatter,
		})),
		customData: '<language>en-us</language>',
	})
}
