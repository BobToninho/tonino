const colorTextBase = 'colors.gray.200'

module.exports = theme => ({
	DEFAULT: {
		css: {
			color: theme(colorTextBase),
			strong: {
				color: theme('colors.primary.DEFAULT')
			},
			a: {
				color: theme('colors.primary.DEFAULT')
			},
			'a:hover': {
				color: theme('colors.primary.dark')
			},
			h1: {
				color: theme(colorTextBase)
			},
			h2: {
				color: theme(colorTextBase)
			},
			h3: {
				color: theme(colorTextBase)
			},
			h4: {
				color: theme(colorTextBase)
			}
		}
	}
})
