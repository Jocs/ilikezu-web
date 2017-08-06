import { Toast } from 'mint-ui'

export const errorTip = message => {
	Toast({
		message,
		duration: 3000,
		iconClass: 'iconfont icon-cry',
		position: 'middle'
	})
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
