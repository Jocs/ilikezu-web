<template>
	<div class="personal-setting">
		<bar-top
			:text="title"
		></bar-top>
		<div class="scroll-wrapper">
			<div class="head-uri">
				<div class="image-wrapper">
					<img :src="headUri" alt="">
					<span class="mask"
						@click="uploadHeadUri"
					>
						<i class="iconfont icon-upload"></i>
					</span>
				</div>
			</div>
			<div class="user-info">
				<div class="form-controll">
					<label>昵称:</label>
					<input type="text" v-model="nickName"
						placeholder="请填写用户昵称" 
					>
				</div>
			</div>
		</div>
		<div class="bar-bottom">
			<a href="javascript:;" @click="jump('/personal')">取消</a>
			<a href="javascript:;" class="confirm" @click="confirm">提交</a>
		</div>
	</div>
</template>

<script>
	import BarTop from '../components/barTop.vue'
	import { mapState } from 'vuex'
	import uploadFile from '../common/uploadFile'
	import { errorTip } from '../common/util'
	import { Indicator } from 'mint-ui';

	export default {
		data() {
			return {
				title: '修改个人资料',
				headUri: '',
				nickName: ''
			}
		},
		components: {
			'bar-top': BarTop
		},
		computed: {
			...mapState(['userInfo'])
		},
		created() {
			this.$nextTick(() => {
				if (!this.userInfo.recordId) this.$router.push('/personal')
				else {
					const { headUri, nickName } = this.userInfo
					this.headUri = headUri
					this.nickName = nickName
				}
			})
		},
		methods: {
			jump(path) {
				this.$router.push(path)
			},
			uploadHeadUri() {
				// this.$Progress.start()
				uploadFile(`${rootOrigin}/common/uploadPic.xhtml`, {}, Indicator)
					.then(res => {
						const resObj = JSON.parse(res)
						if (resObj.isSuccess) {
							this.headUri = resObj.data.url
							// this.$Progress.finish()
						} else {
							return Promise.reject(resObj)
						}
					})
					.catch(err => {
						if (err.msg) errorTip(err.msg)
						else errorTip('上传图片失败')
						// this.$Progress.fail()
					})
			},
			confirm() {
				const { headUri, nickName } = this
				if (headUri === this.userInfo.headUri && nickName === this.userInfo.nickName) {
					return this.$router.push('/personal')
				}
				const params = {headUri, nickName}
				Indicator.open()
				this.$store.dispatch('UPDATE_USER_INFO', params)
					.then(res => {
						if (res.isSuccess) this.$router.push('/personal')
						else return Promise.reject(res.msg)
						Indicator.close()
					})
					.catch(msg => {
						errorTip(msg)
						Indicator.close()
					})

			}
		}
	}
</script>

<style lang="scss">
	.personal-setting {
		.scroll-wrapper {
			height: calc(100vh - 4.7rem);
			margin-top: 2.2rem;
			margin-bottom: 2.5rem;
			box-sizing: border-box;
			overflow: auto;
			-webkit-overflow-scrolling: touch;
			background: #fff;
			.head-uri {
				height: 7rem;
				padding-top: 1.7rem;
				box-sizing: border-box;
				background: #ccc;
				.image-wrapper {
					width: 3.6rem;
					height: 3.6rem;
					margin: 0 auto;
					overflow: hidden;
					border-radius: 50%;
					position: relative;
					img {
						width: 100%;
						height: 100%;
					}
					.mask {
						position: absolute;
						top: 0;
						left: 0;
						bottom: 0;
						right: 0;
						background: rgba(0, 0, 0, .3);
						text-align: center;
						padding-top: .8rem;
						i {
							color: #fff;
							font-size: 1.5rem;
						}
					}
				}
			}
			.user-info {
				padding-top: 2.5rem;
				.form-controll {
					height: 2.2rem;
					line-height: 2.2rem;
					padding: 0 .5rem;
					display: flex;
					border-bottom: 1px solid #eee;
					font-size: .75rem;
					color: #333;
					label {
						width: 3rem;
						text-align: left;
					}
					input {
						flex: 1;
						outline: none;
						border: none;
						font-size: .75rem;

					}
				}
			}
		}
		.bar-bottom {
			position: fixed;
			height: 2.5rem;
			width: 100%;
			bottom: 0;
			display: flex;
			box-shadow: 0 1px 2px #999;
			background: #fff;
			a {
				flex: 1;
				height: 2.5rem;
				color: #333;
				text-align: center;
				line-height: 2.5rem;
			}
			.confirm {
				background: #00bbe4;
				color: #fff;
			}
		}
	}
</style>