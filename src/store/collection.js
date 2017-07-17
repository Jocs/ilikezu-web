/**
 * create by JOCS 2017.06.25
 */

import Resources from './resources'
// import { errorTip } from '../common/util'

const state = {
	collection: [],
	coLoading: {
		status: false,
		hasMore: true
	}
}

const mutations = {
	SET_COLLECTION(state, {type, payload}) {
		switch (type) {
			case 'RESET':
				state.collection = payload
				break
			case 'ADD':
				state.collection = [...state.collection, ...payload]
				break
		}
	},
	SET_CO_STATUS(state, obj) {
		state.coLoading = obj
	}
}

const actions = {
	GET_COLLECTION({commit, state}, params) {
		if (state.coLoading.status || !state.coLoading.hasMore) return false
		commit('SET_CO_STATUS', {status: true, hasMore: true})
		return Resources.getCollection.get(params)
			.then(res => res.data ? res.data : Promise.reject(res.msg))
			.then(res => {
				const result = res.result.map(r => Object.assign(r, {logoUri: `http://pic5.ilikezu.cn/${r.logoUri}`}))
				if (params.from === 0) {
					commit('SET_COLLECTION', {type: 'RESET', payload: result})
				} else {
					commit('SET_COLLECTION', {type: 'ADD', payload: result})
				}
				commit('SET_CO_STATUS', {status: false, hasMore: true})
			})
			.catch(msg => {
				commit('SET_CO_STATUS', {status: true, hasMore: false})
				console.log(msg)
			})
	}
}

export default {state, mutations, actions}
