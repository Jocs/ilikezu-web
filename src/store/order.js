/**
 * create by JOCS 2017.06.25
 */

import Resources from './resources'
// import { errorTip } from '../common/util'

const state = {
	orderList: [],
	orLoading: {
		status: false,
		hasMore: true
	}
}

const mutations = {
	SET_ORDER_LIST(state, {payload, type}) {
		switch (type) {
			case 'ADD': {
				state.orderList = [...state.orderList, ...payload]
				break
			}
			case 'RESET': {
				state.orderList = payload
				break
			}
		}
	},
	SET_ORDER_STATUS(state, orLoading) {
		state.orLoading = orLoading
	}
}

const actions = {
	GET_ORDERS({commit, state}, params) {
		if (state.orLoading.status || !state.orLoading.hasMore) return false
		commit('SET_ORDER_STATUS', {status: true, hasMore: true})
		return Resources.orderList.get(params)
			.then(res => res.data && res.data.orderList.length > 0 ? res.data : Promise.reject(res.msg))
			.then(res => {
				Object.keys(res.proMap).forEach(k => {
					res.proMap[k].logoUri = `http://pic5.ilikezu.cn/${res.proMap[k].logoUri}`
				})
				const orderList = res.orderList.map(o => Object.assign(o, {product: res.proMap[o.productId]}))
				if (params.from === 0) {
					commit('SET_ORDER_LIST', {type: 'RESET', payload: orderList})
				} else {
					commit('SET_ORDER_LIST', {type: 'ADD', payload: orderList})
				}
				commit('SET_ORDER_STATUS', {status: false, hasMore: true})
				console.log(orderList)
			})
			.catch(msg => {
				commit('SET_ORDER_STATUS', {status: true, hasMore: false})
				// console.log(msg)
			})
	},
	ORDER({commit}, params) {
		return Resources.order.get(params)
	},
	WECHAT_PAY({commit}, params) {
		return Resources.wechatPay.post(params)
	}
}

export default {state, mutations, actions}
