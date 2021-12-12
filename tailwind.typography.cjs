const colorTextBase = 'colors.gray.200'

module.exports = theme => {
	// const base = theme(colorTextBase)
	const base = 'var(--foreground)'

	return {
		DEFAULT: {
			css: {
				color: base,
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
					color: base,
					fontWeight: 700,
				},
				h2: {
					color: base,
				},
				h3: {
					color: base,
				},
				h4: {
					color: base,
				},
				code: {
					color: theme('colors.primary.600'),
				},
			},
		},
	}
}
