import { Toast } from 'mint-ui'

export const errorTip = message => {
	Toast({
		message,
		duration: 3000,
		iconClass: 'iconfont icon-cry',
		position: 'middle'
	})
}
