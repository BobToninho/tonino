const postcssJitProps = require('postcss-jit-props')
const path = require('path')
const OpenProps = require('open-props')

module.exports = {
	plugins: [postcssJitProps(OpenProps), require('autoprefixer'), require('tailwindcss')],
}
