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
	}
}

const mutations = {
	SET_USER_INFO(state, userInfo) {
		state.userInfo = userInfo
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
	GET_FANS({commit}) {
		return Resources.fanList.get({from: 0, max: 6})
	}
}

export default {state, mutations, actions}
