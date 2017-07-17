/**
 * create by JOCS 2017.06.22
 */

const webpack = require('webpack')
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const PACKAGE = require('../package.json')

const PATHS = {
	app: path.join(__dirname, '../src'),
	build: path.join(__dirname, '../')
};

module.exports = env => ({
	devtool: 'source-map',
	entry: {
		app: `${PATHS.app}/index.js`,
		libs: Object.keys(PACKAGE.dependencies)
	},
	output: {
		path: path.join(PATHS.build, 'dist'),
		filename: '[name]-[hash:20].min.js',
		publicPath: 'http://mpstatic.ilikezu.cn/'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			},
			__DEVELOPMENT__: false
		}),
		new CleanPlugin(['dist']), // 删除build目录
		new HTMLPlugin({
			template: PATHS.app + '/index.html',
			filename: PATHS.build + 'dist/index.html',
			env: 'production',
			inject: false
		}),
		// new webpack.optimize.OccurenceOrderPlugin(), webpack 2 by Default
		new webpack.optimize.CommonsChunkPlugin({
			name: 'libs',
			filename: 'libs-[hash:8].min.js'
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			minimize: true
		})
	]
});
