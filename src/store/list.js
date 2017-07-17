/**
 * create by JOCS 2017.06.24
 */

import Resources from './resources'

const state = {
	seProducts: [],
	seLoading: { // 无线滚动是，是否还有更多
		status: false,
		hasMore: true
	}
}

const mutations = {
	SET_SE_PRODUCTS(state, {products, type}) {
		console.log(type)
		switch (type) {
			case 'add': {
				state.seProducts = [...state.seProducts, ...products]
				break
			}
			case 'reset': {
				state.seProducts = products
				break
			}
		}
	},
	SET_SE_MORE_STATUS(state, seLoading) {
		state.seLoading = seLoading
	}
}

const actions = {
	GET_SE_PRODUCTS({commit, state}, params) {
		console.log(state.seLoading)
		const { from } = params
		if (from > 0 && state.seLoading.status) return false
		if (from > 0) commit('SET_SE_MORE_STATUS', {status: true, hasMore: true})
		Resources.getSeProducts.get(params)
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
					commit('SET_SE_MORE_STATUS', {status: false, hasMore: true})
				} else {
					commit('SET_SE_MORE_STATUS', {status: true, hasMore: false})
				}
				commit('SET_SE_PRODUCTS', {products, type: from === 0 ? 'reset' : 'add'})
			})
	}
}

export default {state, mutations, actions}
