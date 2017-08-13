import { Toast } from 'mint-ui'

export const errorTip = message => {
	Toast({
		message,
		duration: 3000,
		iconClass: 'iconfont icon-cry',
		position: 'middle'
	})
}

export const getCookie = key => {
	const cookieHash = document.cookie.split(';').reduce((acc, c) => {
		const token = c.split('=')
		acc[token[0]] = token[1]
		return acc
	}, {})
	return cookieHash[key]
}
/**
 * 设置cookie但不覆盖原有cookie
 */
export const setCookieNoShadow = (key, value) => {
	if (getCookie(key)) return false
	const now = +new Date()
	const expires = new Date(now + 10 * 24 * 60 * 60 * 1000) // 十天过期
	document.cookie = `${key}=${value};expires=${expires}`
}

export const wxPay = (params, cb) => {
	delete params.sign
	function onBridgeReady() {
		WeixinJSBridge.invoke(
			'getBrandWCPayRequest', params,
			function(res) {
				cb(res)
				// if(res.err_msg === 'get_brand_wcpay_request:ok') {
				// 	cb(res)
				// } else {
				// 	errCb(res
				// } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
			}
		)
	}
	if (typeof WeixinJSBridge === 'undefined') {
		if (document.addEventListener) {
			document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
		} else if (document.attachEvent) {
			document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
			document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
		}
	} else {
		onBridgeReady()
	}
}

export const weixinConfig = params => {

	const {
		appid: appId,
		timestamp,
		noncestr: nonceStr,
		sign: signature,
		url: link,
		title,
		desc,
		imgUrl
	} = params

	wx.config({
		debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId, // 必填，公众号的唯一标识
		timestamp, // 必填，生成签名的时间戳
		nonceStr, // 必填，生成签名的随机串
		signature, // 必填，签名，见附录1
		jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	})

	wx.ready(() => {
		wx.onMenuShareTimeline({
			title, desc, link, imgUrl,
			success() {
				console.log('share success')
			},
			cancel() {
				console.log('share fail')
			}
		})

		wx.onMenuShareAppMessage({
			title, desc, link, imgUrl, type: 'link',
			success() {
				console.log('share success')
			},
			cancel() {
				console.log('share fail')
			}
		})
	})

	wx.error(err => {
		console.log(err)
		console.log('配置失败')
	})
}

