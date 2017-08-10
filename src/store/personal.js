/**
 * create by JOCS 2017.06.25
 */

import Resources from './resources'

const state = {
	userInfo: {
		headUri: '',
		nickName: '',
		recordId: '',
		status: ''
	},
	fans: [],
	faLoading: {
		status: false,
		hasMore: true
	}
}

const mutations = {
	SET_USER_INFO(state, userInfo) {
		state.userInfo = userInfo
	},
	SET_FANS(state, {payload, type}) {
		switch (type) {
			case 'ADD': {
				state.fans = [...state.fans, ...payload]
				break
			}
			case 'RESET': {
				state.fans = payload
				break
			}
		}
	},
	SET_FANS_STATUS(state, faLoading) {
		state.faLoading = faLoading
	}
}

const actions = {
	GET_USER_INFO({commit}) {
		return Resources.userInfo.get()
			.then(res => {
				if (res.data) {
					return res.data
				} else {
					commit('SET_LOGIN_STATUS', {status: false, key: ''})
					return Promise.reject(res.msg)
				}
			})
			.then(res => {
				let {headUri, nickName, recordId, status} = res.member
				headUri = /^http:\/\//.test(headUri) ? headUri : res.basePic + headUri + '@200w' // 裁剪图片200px width
				commit('SET_USER_INFO', {headUri, nickName, recordId, status})
				return {headUri, nickName, recordId, status}
			})
	},
	UPDATE_USER_INFO({commit}, params) {
		return Resources.updateUserInfo.get(params)
	},
	GET_FANS({commit}, params) {
		if (state.faLoading.status || !state.faLoading.hasMore) return false
		commit('SET_FANS_STATUS', {status: true, hasMore: true})
		return Resources.fanList.get(params)
			.then(res => res.data && res.data.result.length > 0 ? res.data : Promise.reject(res.msg))
			.then(res => {
				res.result.forEach(fan => {
					if (!/^https?:\/\//.test(fan.headPic)) {
						fan.headPic = `${res.basePic}${fan.headPic}`
					}
				})
				console.log(res.result)
				if (params.from === 0) {
					commit('SET_FANS', {type: 'RESET', payload: res.result})
				} else {
					commit('SET_FANS', {type: 'ADD', payload: res.result})
				}
				commit('SET_FANS_STATUS', {status: false, hasMore: true})
			})
			.catch(msg => {
				commit('SET_FANS_STATUS', {status: true, hasMore: false})
				// console.log(msg)
			})
	}
}

export default {state, mutations, actions}
