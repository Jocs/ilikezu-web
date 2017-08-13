/**
 * create by JOCS 2017.06.23
 */
import { getFinalParams } from './help'
import qs from 'querystring'
import axios from 'axios'

const { rootOrigin } = window // 'http://m.iLikezu.cn'

const fetch = (path, method, data) => {
	const params = getFinalParams(data)
	const url = method === 'GET'
		? `${path}?${Object.keys(params).sort().map(k => `${k}=${params[k]}`).join('&')}`
		: path

	const options = {
		method,
		url,
		responseType: 'json'
	}
	if (method === 'GET') delete options.data
	if (method === 'POST') {
		Object.assign(options, {headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}})

		params['api_u_key'] = decodeURIComponent(params['api_u_key'])

		options.data = qs.stringify(params)

		// console.log(JSON.stringify(options, null, 4))
	}
	return new Promise((resolve, reject) => {
		axios(options)
			.then(response => {
				response.status >= 400 ? reject(response) : resolve(response.data)
			})
			.catch(reject)
	})
}

const genResource = path => ({
	get(params = {}) {
		return fetch(path, 'GET', params)
	},

	post(data) {
		return fetch(path, 'POST', data)
	}
})
export default {
	// 首页轮播广告接口
	getBanner: genResource(`${rootOrigin}/api/getIndexTopre.xhtml`),
	// 分类接口
	getCards: genResource(`${rootOrigin}/api/getprocateData.xhtml`),
	// 首页推荐商品
	getReProducts: genResource(`${rootOrigin}/api/getRecomondattionProduct.xhtml`),
	// 搜索商品接口
	getSeProducts: genResource(`${rootOrigin}/api/index.xhtml`),
	// 获取图像验证码
	getImageCode: genResource(`${rootOrigin}/api/getCaptchaId.xhtml`),
	// 获取手机验证码
	getMobileCode: genResource(`${rootOrigin}/api/sendLoginDynamicCode.xhtml`),
	// 登录
	login: genResource(`${rootOrigin}/api/loginByMobileCode.xhtml`),
	// 商品详情
	getProduct: genResource(`${rootOrigin}/api/productDetails.xhtml`),
	// 检测是否被收藏
	checkCollect: genResource(`${rootOrigin}/api/collection/isCollected.xhtml`),
	// 收藏
	collect: genResource(`${rootOrigin}/api/collection/addCollection.xhtml`),
	// 取消收藏
	cancelCollect: genResource(`${rootOrigin}/api/collection/cancelCollection.xhtml`),
	// 用户信息
	userInfo: genResource(`${rootOrigin}/api/getLoginMemberInfo.xhtml`),
	// 获取用户地址列表
	getAddress: genResource(`${rootOrigin}/api/getMemberAddressList.xhtml`),
	// 删除用户地址
	deleteAddress: genResource(`${rootOrigin}/api/delMemberAddress.xhtml`),
	// 获取省份
	getPro: genResource(`${rootOrigin}/api/getAllCityData.xhtml`),
	// 更新地址
	updateAddress: genResource(`${rootOrigin}/api/addMemberAddress.xhtml`),
	// 获取收藏列表
	getCollection: genResource(`${rootOrigin}/api/collection/ListCollection.xhtml`),
	// 微信预登陆
	preWeiXinLogin: genResource(`${rootOrigin}/api/getMpLoginUrl.xhtml`),
	// 修改个人信息
	updateUserInfo: genResource(`${rootOrigin}/api/updateMemberInfo.xhtml`),
	// 获取订单列表
	orderList: genResource(`${rootOrigin}/api/order/listMyOrder.xhtml`),
	// 详情页面，当点击立即下单时，判断是否登录
	checkIsLogin: genResource(`${rootOrigin}/api/isMemberAvaliale.xhtml`),
	// /api/listrecommenfriends.xhtml  我的粉丝列表
	fanList: genResource(`${rootOrigin}/api/listrecommenfriends.xhtml`),
	// 下单接口
	order: genResource(`${rootOrigin}/api/order/addOrder.xhtml`),
	// 微信支付
	wechatPay: genResource(`${rootOrigin}/api/pay/mppay.xhtml`),
	// 获取_f值
	getShare: genResource(`${rootOrigin}/api/getMemberRecommentID.xhtml`),
	// 获取微信参数
	getWeiXinConfig: genResource(`${rootOrigin}/api/getMpShareParams.xhtml`)
}

