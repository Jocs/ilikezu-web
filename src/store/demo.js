/**
 * create by JOCS 2017.06.25
 */

import Resources from './resources'
import { errorTip } from '../common/util'

const state = {
}

const mutations = {
	SET_PRODUCT(state, product) {
		state.product = product
	}
}

const actions = {
	GET_PRODUCT({commit}, params) {
		return Resources.getProduct.get(params)
			.then(res => res.data)
			.then(res => {
				res.product.logoUri = `${res.basePic}${res.product.logoUri}`
				const product = {
					picList: res.picList.map(p => `${res.basePic}${p.url}`),
					detail: res.product,
					content: res.bc.content
				}
				commit('SET_PRODUCT', product)
			})
			.catch(() => errorTip('获取商品详情失败'))
	}
}

export default {state, mutations, actions}
