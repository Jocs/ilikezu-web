/**
 * create by JOCS 2017.06.22
 */

import express from 'express'
import path from 'path'
import child_process from 'child_process'
import webpackInit from '../webpack/server.config'

const app = express()

webpackInit(app)

app.use(express.static(path.join(__dirname, '../dist')))

app.listen(8888, err => {

	if (err) {
		return false
	}
	console.log('Listening at http://localhost:8888')

	// 调用默认浏览器自动打开页面
	const exec = child_process.exec
	const url = 'http://localhost:8888/index.html'

	switch (process.platform) {
		case 'darwin':
			exec(`open ${url}`)
			break
		case 'win32':
			exec(`start ${url}`)
			break
		default:
			exec('xdg-open', [url])
	}
})
