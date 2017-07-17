/**
 * create by JOCS 2017.06.25
 */

import Resources from './resources'
import { errorTip } from '../common/util'

const state = {
	proviences: [],
	cities: {'-1': []},
	dises: {'-1': []}
}

const mutations = {
	SET_ADDRESS_LIST(state, {type, payload}) {
		switch (type) {
			case 'pro':
				state.proviences = payload
				break
			case 'city':
				state.cities = Object.assign({}, payload, {'-1': []})
				break
			case 'dis':
				state.dises = Object.assign({}, payload, {'-1': []})
				break
		}
	}
}

const actions = {
	GET_ADDRESS_LIST({commit}, params) {
		return Resources.getPro.get(params)
			.then(res => res.data ? res.data : Promise.reject(res.msg))
			.then(res => {
				const hash = {
					'pro': 'proviceList',
					'city': 'cityList',
					'dis': 'disList'
				}
				if (res[hash[params.type]]) {
					commit('SET_ADDRESS_LIST', {type: params.type, payload: res[hash[params.type]]})
				} else {
					Promise.reject('获取省份、城市、地区失败')
				}
			})
			.catch(msg => errorTip(msg))
	},
	UPDATE_ADDRESS({commit}, params) {
		return Resources.updateAddress.get(params)
	}
}

export default {state, mutations, actions}
