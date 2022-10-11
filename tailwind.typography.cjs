const ContentTypes = {
	CONTENT: 'content',
	POPOUT: 'popout',
	FEATURE: 'feature',
	FULL: 'full',
}
const base = 'var(--foreground)'

module.exports = theme => {
	return {
		DEFAULT: {
			css: {
				color: base,
				maxWidth: 'initial',
				strong: {
					color: theme('colors.primary.600'),
				},
				a: {
					color: theme('colors.primary.600'),
				},
				'a:hover': {
					color: theme('colors.primary.dark'),
				},
				h1: {
					fontWeight: 700,
				},
				code: {
					color: theme('colors.primary.600'),
				},
				'h1, h2, h3, h4': {
					color: base,
				},
				'h1, h2, h3, h4, p, ol, ul': {
					gridColumn: ContentTypes.CONTENT,
				},
				pre: {
					gridColumn: ContentTypes.POPOUT,
				},
			},
		},
	}
}
