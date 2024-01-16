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
				code: {
					color: theme('colors.primary.600'),
				},
				'h1, h2, h3, h4': {
					fontFamily: 'Montserrat, sans-serif',
					// fontFamily: 'Lora, serif',
					fontWeight: 700,
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
		black: {
			css: {
				// '--tw-prose-body': theme('colors.pink[800]'),
				// '--tw-prose-headings': theme('colors.pink[900]'),
				// '--tw-prose-lead': theme('colors.pink[700]'),
				// '--tw-prose-links': theme('colors.pink[900]'),
				// '--tw-prose-bold': theme('colors.pink[900]'),
				// '--tw-prose-counters': theme('colors.pink[600]'),
				'--tw-prose-bullets': '#000',
				// '--tw-prose-hr': theme('colors.pink[300]'),
				// '--tw-prose-quotes': theme('colors.pink[900]'),
				// '--tw-prose-quote-borders': theme('colors.pink[300]'),
				// '--tw-prose-captions': theme('colors.pink[700]'),
				// '--tw-prose-code': theme('colors.pink[900]'),
				// '--tw-prose-pre-code': theme('colors.pink[100]'),
				// '--tw-prose-pre-bg': theme('colors.pink[900]'),
				// '--tw-prose-th-borders': theme('colors.pink[300]'),
				// '--tw-prose-td-borders': theme('colors.pink[200]'),
				// '--tw-prose-invert-body': theme('colors.pink[200]'),
				// '--tw-prose-invert-headings': theme('colors.white'),
				// '--tw-prose-invert-lead': theme('colors.pink[300]'),
				// '--tw-prose-invert-links': theme('colors.white'),
				// '--tw-prose-invert-bold': theme('colors.white'),
				// '--tw-prose-invert-counters': theme('colors.pink[400]'),
				// '--tw-prose-invert-bullets': theme('colors.pink[600]'),
				// '--tw-prose-invert-hr': theme('colors.pink[700]'),
				// '--tw-prose-invert-quotes': theme('colors.pink[100]'),
				// '--tw-prose-invert-quote-borders': theme('colors.pink[700]'),
				// '--tw-prose-invert-captions': theme('colors.pink[400]'),
				// '--tw-prose-invert-code': theme('colors.white'),
				// '--tw-prose-invert-pre-code': theme('colors.pink[300]'),
				// '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
				// '--tw-prose-invert-th-borders': theme('colors.pink[600]'),
				// '--tw-prose-invert-td-borders': theme('colors.pink[700]'),
			},
		},
	}
}
