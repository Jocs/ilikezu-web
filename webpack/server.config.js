/**
 * create by JOCS 2017.06.22
 */

import webpack from 'webpack'
import webpackDevMiddelware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import webpackConfigration from './common.config'

const compiler = webpack(webpackConfigration)

const webpackInit = app => {

	process.env.NODE_ENV = process.env.NODE_ENV || 'development'
	app.use(webpackDevMiddelware(compiler, {
		noInfo: true,
		publicPath: webpackConfigration.output.publicPath
	}));
	app.use(webpackHotMiddleware(compiler, {
		log: console.log,
		path: '/__webpack_hmr',
		heartbeat: 10 * 1000
	}))

}

export default webpackInit
