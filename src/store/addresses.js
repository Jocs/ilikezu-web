/**
 * create by JOCS 2017.06.25
 */

import Resources from './resources'
// import { errorTip } from '../common/util'

const state = {
	addresses: [],
	defaultAddress: null
}

const mutations = {
	SET_ADDRESS(state, addresses) {
		state.addresses = addresses
	},
	SET_DEFAULT_ADDRESS(state, address) {
		state.defaultAddress = address
	}
}

const actions = {
	GET_ADDRESS({commit}) {
		return Resources.getAddress.get()
			.then(res => res.data ? res.data : Promise.reject(res.msg))
			.then(res => {
				if (res.addressList) {
					commit('SET_ADDRESS', res.addressList)
					return Promise.resolve(res.addressList)
				} else {
					return Promise.reject('获取地址列表失败')
				}
			})
	},
	GET_DEFAULT_ADDRESS({commit}, defaultAddress) {
		commit('SET_DEFAULT_ADDRESS', defaultAddress)
	},
	DELETE_ADDRESS({commit}, params) {
		return Resources.deleteAddress.get(params)
	}
}

export default {state, mutations, actions}
