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
		Resources.userInfo.get()
			.then(res => {
				if (res.data) {
					return res.data
				} else {
					return Promise.reject()
				}
			})
			.then(res => {
				let {headUri, nickName, recordId, status} = res.member
				headUri = res.basePic + headUri + '@200w' // 裁剪图片200px width
				commit('SET_USER_INFO', {headUri, nickName, recordId, status})
			})
			.catch(() => console.log('获取用户信息失败'))
	},
	UPDATE_USER_INFO({commit}, params) {
		return Resources.updateUserInfo.get(params)
	}
}

export default {state, mutations, actions}
