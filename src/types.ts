export interface BlogPost {
	file: string
	frontmatter: Frontmatter
	url: string
}

export interface Frontmatter {
	title: string
	description: string
	pubDate?: string
	lang?: string
	categories?: string[]
	meta?: Meta
	layout?: string
	draft?: boolean
}

export interface Meta {
	keywords: string[]
}
