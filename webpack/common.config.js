/**
 * create by JOCS 2017.06.22
 */

const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')

const development = require('./dev.config.js')
const production = require('./prod.config.js')

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
	app: path.join(__dirname, '../src'),
	build: path.join(__dirname, '../dist')
};

const common = {
	resolve: {
		extensions: ['.js', '.json', '.vue', '.scss', '.html'],
		enforceExtension: false,
		modules: ['node_modules', PATHS.app],
		alias: {
			// assets: path.resolve(__dirname, '../src/assets')
		}
	},
	externals: {
		// TODO
	},
	module: {
		rules: [{
	        enforce: 'pre',
	        test: /\.js$/,
	        exclude: /node_modules/,
	        loader: 'eslint-loader'
	      }, {
	        test: /\.js$/,
	        exclude: /node_modules/,
	        loader: 'babel-loader'
	      }, {
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				loaders: {
					'scss': ExtractTextPlugin.extract({
						use: 'css-loader!sass-loader',
						fallback: 'vue-style-loader'
					})
				}
			}
		}, {
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader', options: {importLoaders: 1}
				}]
			})
		}, {
			test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url-loader?limit=10000&mimetype=application/font-woff'
		}, {
			test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url-loader?limit=10000&mimetype=application/font-woff2'
		}, {
			test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
		}, {
			test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url-loader?limit=10000&mimetype=application/font-otf'
		}, {
			test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'file-loader'
		}, {
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
		}, {
			test: /\.(jpe?g|png|gif|svg)$/i,
			loaders: [
				'file-loader?hash=sha512&digest=hex&name=[path][name]-[hash:8].[ext]'
				// 'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
			]
		}]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'app-[contenthash:8].min.css',
			disable: false,
			allChunks: true
		}),
		new webpack.NoEmitOnErrorsPlugin()
	]
}

if (TARGET === 'start' || !TARGET) {
	module.exports = merge(development, common)
}
if (TARGET === 'build' || TARGET === 'production') {
	module.exports = env => {
		return merge(production(env), common)
	}
}
