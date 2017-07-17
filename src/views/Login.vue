<template>
	<div class="login-page">
		<bar-top :text="title"></bar-top>
		<div class="login">
			<div class="head">手机登录</div>
			<form>
				<div class="form-control">
					<label>手机号:</label>
					<input type="number" placeholder="请输入11位手机号"
						v-model="mobile"
					>
				</div>
				<div class="form-control">
					<label>校验码:</label>
					<input type="text" placeholder="请输入图形校验码"
						v-model="imageCode"
					>
					<div class="imagecode-wrapper"
						@click="updateImgeCode"
					>
						<img :src="imageCodeUrl" alt="点击刷新">
					</div>
				</div>
				<div class="form-control">
					<label>验证码:</label>
					<input type="text" placeholder="请输入手机验证码"
						v-model="mobileCode"
					>
					<a href="javascript:;"
						@click="getMobileCode"
					>{{message}}</a>
				</div>
				<div>
					<a 	
						href="javascript:;" 
						class="confirm"
						@click="login"
					>确认</a>
				</div>
			</form>
			<div class="others">
				<div class="text">社交账号登录</div>
				<i class="iconfont icon-wechat"
					@click="preWeiXinLogin"
				></i>
			</div>
		</div>
		<bar-bottom></bar-bottom>		
	</div>
</template>
<script>
	import BarBottom from '../components/barBottom.vue'
	import BarTop from '../components/barTop.vue'
	import { errorTip } from '../common/util'
	import { mapState } from 'vuex'
	import Resources from '../store/resources'
	export default {
		data() {
			return {
				title: '个人中心',
				mobile: '',
				imageCode: '',
				mobileCode: '',
				disable: false,
				message: '获取验证码'

			}
		},
		computed: {
			...mapState(['isLogin', 'imageCodeUrl'])
		},
		watch: {
			isLogin(value) {
				if (value) this.$router.push('/personal')
			}
		},
		components: {
			'bar-bottom': BarBottom,
			'bar-top': BarTop
		},
		created() {
			this.$nextTick(() => {
				if (this.isLogin) return this.$router.push('/personal')
				this.updateImgeCode()
			})
		},
		methods: {
			updateImgeCode() {
				this.$store.dispatch('GET_IAMGE_CODE')
			},
			// { "mobile":mobile,"captchaId":captchaId,"captcha":captcha} captchaId是图片验证码图片的后半部url.captcha是图片验证码
			getMobileCode() {
				// 校验手机号和图形验证码
				if (!/^[\d]{11}$/.test(this.mobile)) return errorTip('手机号码格式不正确')
				if (!this.imageCode) return errorTip('请输入图形校验码')
				if (this.disable) return errorTip('请稍等')

				const captchaId = this.imageCodeUrl.split('=')[1]
				const captcha = this.imageCode
				const { mobile } = this

				this.disable = true

				Resources.getMobileCode.get({mobile, captcha, captchaId})
					.then(res => {
						if (res.isSuccess) {
							return res.data
						} else {
							return Promise.reject(res.msg)
						}
					})
					.then(res => {
						let timer = null
						let count = 60
						setTimeout(() => {
							clearInterval(timer)
							this.message = '获取验证码'
							this.disable = false
							this.updateImgeCode()
						}, 1000 * 61)
						timer = setInterval(() => {
							this.message = `请等候${count--}秒`
						}, 1000)
					})
					.catch(err => {
						errorTip(err)
						this.disable = false
					})
			},
			login() {
				const { mobile, mobileCode: code } = this
				if (!/^[\d]{11}$/.test(mobile)) return errorTip('手机号码格式不正确')
				if (!code) return errorTip('请输入手机验证码')
				this.$store.dispatch('LOGIN', {mobile, code})
			},
			preWeiXinLogin() {
				const redirectUrl = `${window.location.href.split('#')[0]}#/blank/personal`

				this.$store.dispatch('PRE_WEIXIN', {redirectUrl})
					.then(res => {
						if (res.redirectUrl) {
							window.location.href = res.redirectUrl
							console.log(res.redirectUrl)
						} else {
							return Promise.reject('微信登录失败')
						}
					})
					.catch(errorTip)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.mint-toast {
		i {
			font-size: 1.5rem;
		}
	}
	.login-page {
		.login {
			height: calc(100vh - 4.7rem);
			margin-top: 2.2rem;
			margin-bottom: 2.5rem;
			padding: 2.2rem .5rem;
			box-sizing: border-box;
			.head {
				text-align: center;
				font-size: 1rem;
				color: #333;
				margin: 1.5rem;
			}
			.form-control {
				padding: .6rem 0;
				border-bottom: 1px solid #eee;
				& > label {
					display: inline-block;
					width: 3rem;
					text-align: right;
					font-size: .75rem;
					color: #3D414E;
				}
				input {
					font-size: .75rem;
					outline: none;
					border: none;
					width: 8rem;
				}
				a {
					font-size: .75rem;
				    color: #666;
				    width: 5rem;
				    float: right;
				    text-align: center;
				    display: inline-block;
				    height: 1.4rem;
				    line-height: 1.3rem;
				    border-left: 1px solid #eee;
				}
				.imagecode-wrapper {
					width: 5rem;
					height: 1.4rem;
					float: right;
					display: inline-block;
					img {
						width: 100%;
						height: 100%;
					}
				}
			}
			.confirm {
				display: block;
				height: 2.2rem;
				background: #00bbe4;
				text-align: center;
				line-height: 2.2rem;
				color: #fff;
				width: 100%;
				border-radius: .3rem;
				margin-top: 1rem;
			}
			.others {
				margin-top: 2rem;
				font-size: .75rem;
				color: #999;
				text-align: center;
				.text {
					display: inline-block;
				}
				i {
					font-size: 1.4rem;
					color: #62b900;
				}
			}
		}
	}
</style>