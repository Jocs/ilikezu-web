/**
 * create by JOCS 2017.06.25
 */

import Resources from './resources'
import { errorTip } from '../common/util'
import { html2json, json2html } from 'html2json'

const initProduct = () => ({
	picList: [],
	detail: {
		price: 0,
		baseDay: 0,
		yajin: 0
	}
})

const addAttrs = (json, sizeMap) => {
	if (typeof json === 'object' && json.child && json.child.length > 0) {
		json.child.forEach(c => addAttrs(c, sizeMap))
	} else if (json.node === 'element' && json.tag === 'img') {
		if (!json.attr) json.attr = {}
		const { src: dataSrc } = json.attr
		const { width, height } = JSON.parse(sizeMap[dataSrc])
		const radio = height / width
		const src = `${dataSrc}@50w`
		Object.assign(json.attr, {src, 'data-src': dataSrc}, {'class': 'preview lazy'})
		const child = {attr: json.attr, node: 'element', tag: 'img'}
		const obj = {
			child: [child],
			attr: {
				'class': 'progressive',
				'style': `width: 100vw; height: calc(${radio} * 100vw);`
			},
			node: 'element',
			tag: 'div'
		}
		Object.assign(json, obj)
	}
}

const translate = (content, sizeMap) => {

	const json = html2json(content)
	addAttrs(json, sizeMap)
	return json2html(json)
}

const state = {
	product: initProduct(),
	collected: false
}

const mutations = {
	SET_PRODUCT(state, product) {
		state.product = product
	},
	SET_COLLECT_STATUS(state, bool) {
		state.collected = bool
	}
}

const actions = {
	GET_PRODUCT({commit}, params) {
		return Resources.getProduct.get(params)
			.then(res => res.data)
			.then(res => {
				res.product.logoUri = `${res.basePic}${res.product.logoUri}`
				const product = {
					picList: res.picList.map(p => `${res.basePic}${p.url}`),
					detail: res.product,
					content: translate(res.bc.content, res.imgSize)
				}
				commit('SET_PRODUCT', product)
			})
			.catch(msg => {
				console.log(msg)
				errorTip('获取商品详情失败')
			})
	},
	RESET_PRODUCT({commit}) {
		commit('SET_PRODUCT', initProduct())
	},
	CHECK_COLLECT({commit}, params) {
		Resources.checkCollect.get(params)
			.then(res => {
				if (res.code === '3000') {
					commit('SET_LOGIN_STATUS', {status: false, key: ''})
				} else {
					commit('SET_COLLECT_STATUS', res.isSuccess)
				}
			})
			.catch(() => commit('SET_LOGIN_STATUS', {status: false, key: ''}))
	},
	ADD_COLLECT({commit}, params) {
		Resources.collect.get(params)
			.then(res => {
				res.isSuccess && commit('SET_COLLECT_STATUS', true)
			})
	},
	CANCEL_COLLECT({commit}, params) {
		Resources.cancelCollect.get(params)
			.then(res => {
				res.isSuccess && commit('SET_COLLECT_STATUS', false)
			})
	}
}

export default {state, mutations, actions}
