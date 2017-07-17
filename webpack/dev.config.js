/**
 * create by JOCS 2017.06.22
 */

const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
	devtool: 'cheap-eval-source-map',
	entry: [
		'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
		path.join(__dirname, '../src/') + 'index.js'
	],
	output: {
		path: path.join(__dirname, '../'),
		filename: '[name].js',
		publicPath: '/'
	},

	plugins: [
		new HTMLPlugin({
			template: path.join(__dirname, '../src/') + 'index.html',
			filename: './index.html',
			env: 'local',
			inject: false
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: "'development'"
			},
			__DEVELOPMENT__: true
		}),
		new webpack.HotModuleReplacementPlugin()
	]
};

