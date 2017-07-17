/**
 * create by JOCS 2017.06.22
 */

import Vue from 'vue'
// import FastClick from 'fastclick'
import VueProgressBar from 'vue-progressbar'
import MintUI from 'mint-ui'

import * as filters from './filters'

import App from './index.vue'

import store from './store'
console.log(store)
import router from './router'

import 'mint-ui/lib/style.css'
import './assets/css/iconfont.css'
import './assets/css/reset.css'

const options = {
	color: '#bffaf3',
	failedColor: '#874b4b',
	thickness: '3px',
	transition: {
		speed: '0.1s',
		opacity: '0.6s'
	},
	autoRevert: true,
	location: 'top',
	inverse: false
}

Vue.use(MintUI)
Vue.use(VueProgressBar, options)
// FastClick.attach(document.body)
// register global utility filters.
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

const app = new Vue({
	store,
	router,
	render(h) {
		return h(App)
	}
})
app.$mount('#app')

