/**
 * create by JOCS 2017.06.24
 */

import Resources from './resources'
import { errorTip } from '../common/util'

const isLogin = !!window.localStorage.getItem('api_u_key')

const state = {
	isLogin, // 全局是否登录状态
	imageCodeUrl: '', // 图像验证码
	mobileCode: '' // 手机验证码
}

const mutations = {
	SET_IMAGE_CODE(state, code) {
		state.imageCodeUrl = code
	},
	SET_LOGIN_STATUS(state, {status, key}) {
		localStorage.setItem('api_u_key', key)
		state.isLogin = status
	}
}

const actions = {
	GET_IAMGE_CODE({commit}) {
		Resources.getImageCode.get()
			.then(res => res.data)
			.then(res => {
				const baseURL = window.rootOrigin
				const imageCode = baseURL + '/captcha.xhtml?captchaId=' + res.captchaId
				commit('SET_IMAGE_CODE', imageCode)
			})
	},
	LOGOUT({commit}) {
		commit('SET_LOGIN_STATUS', {status: false, key: ''})
	},
	LOGIN({commit}, params) {
		Resources.login.get(params)
			.then(res => {
				return res.data ? res.data : Promise.reject(res.msg)
			})
			.then(res => {
				commit('SET_LOGIN_STATUS', {status: true, key: res.api_u_key})
			})
			.catch(msg => {
				commit('SET_LOGIN_STATUS', {status: false, key: ''})
				errorTip(msg)
			})
	},
	PRE_WEIXIN({commit}, params) {
		return Resources.preWeiXinLogin.get(params)
			.then(res => res.data ? res.data : Promise.reject(res.msg))
	}

}

export default {state, mutations, actions}
