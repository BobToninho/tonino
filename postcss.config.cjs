const postCssCustomMedia = require('postcss-custom-media')
const postcssJitProps = require('postcss-jit-props')
const OpenProps = require('open-props')

module.exports = {
	plugins: [postcssJitProps(OpenProps), postCssCustomMedia(), require('autoprefixer')],
}
