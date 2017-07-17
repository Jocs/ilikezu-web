/**
 * create by JOCS 2017.06.23
 */

import Resources from './resources'

const state = {
	banner: [],
	cards: [],
	reProducts: [],
	reLoading: {
		status: false,
		hasMore: true
	}// 无线滚动是，是否还有更多
}

const mutations = {
	SET_BANNER(state, banner) {
		state.banner = banner
	},
	SET_CARDS(state, cards) {
		state.cards = cards
	},
	SET_RE_PRODUCTS(state, {products, type}) {
		switch (type) {
			case 'add': {
				state.reProducts = [...state.reProducts, ...products]
				break
			}
			case 'reset': {
				state.reProducts = products
				break
			}
		}
	},
	SET_MORE_STATUS(state, reLoading) {
		state.reLoading = reLoading
	}
}

const actions = {
	GET_BANNER({commit}, params) {
		Resources.getBanner.get(params = {from: 0, maxNum: 5})
			.then(res => {
				console.log(res)
				const banner = res.data.list.map(l => `${res.data.basePic}${JSON.parse(l.content).logo}`)
				commit('SET_BANNER', banner)
			})
	},
	GET_CARDS({commit}) {
		Resources.getCards.get()
			.then(res => {
				const cards = res.data.list.map(l => ({src: `${res.data.basePic}${l.logoUri}`, text: l.name, proTypeId: l.recordId}))
				commit('SET_CARDS', [cards.slice(0, 4), cards.slice(4)])
			})
	},
	GET_RE_PRODUCTS({commit, state}, {from, maxNum}) {

		if (from > 0 && state.reLoading.status) return false
		if (from > 0) commit('SET_MORE_STATUS', {status: true, hasMore: true})
		Resources.getReProducts.get({from, maxNum})
			.then(res => res.data)
			.then(res => {
				const products = res ? res.list.map(l => ({
					price: l.price,
					recordId: l.recordId,
					title: l.title,
					src: res.basePic + l.logoUri,
					district: res.dis[l.disId].name
				})) : []
				if (products.length > 0) {
					commit('SET_RE_PRODUCTS', {products, type: from === 0 ? 'reset' : 'add'})
					commit('SET_MORE_STATUS', {status: false, hasMore: true})
				} else {
					commit('SET_MORE_STATUS', {status: true, hasMore: false})
				}
			})
	}
}

export default {state, mutations, actions}
