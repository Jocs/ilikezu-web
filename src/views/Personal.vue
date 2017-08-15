<template>
	<div class="personal">
		<div class="scroll-wrapper">
			<section class="head">
				<div class="image-wrapper"
					@click="jump('/personalSetting')"
				>
					<img :src="userInfo.headUri" alt="">
				</div>
				<div class="nick-name">
					<div>{{userInfo.nickName || '匿名用户'}}</div>
					<div class="vip">VIP 会员</div>
				</div>
			</section>
			<section class="navs">
				<mt-cell
					v-for="(nav, index) of navs"
					:key="index"
					:title="nav.title"
					is-link
					:to="nav.path"
				>
					<i 
						class="iconfont" slot="icon"
						:class="nav.icon"
						:style="{color: nav.iconColor}"
					></i>
				</mt-cell>
			</section>
			<section class="navs">
				<mt-cell
					v-for="nav of aboutNavs"
					:key="nav.title"
					:title="nav.title"
					:label="nav.label"
					is-link
					:to="nav.path"
				>
				</mt-cell>
			</section>
			<section class="logout">
				<a href="javascript:;"
					@click="logOut"
				>退出登录</a>
			</section>
		</div>
		
		<bar-bottom></bar-bottom>		
	</div>
</template>
<script>
	import BarBottom from '../components/barBottom.vue'
	// import BarTop from '../components/barTop.vue'
	import { mapState } from 'vuex'

	export default {
		data() {
			return {
				navs: [{
					title: '我的订单', label: '查看订单列表', icon: 'icon-order', iconColor: '#FF3D00', path: '/orders'
				}, {
					title: '地址管理', label: '修改、编辑收货地址', icon: 'icon-logistic', iconColor: '#FF8C00', path: '/addresses/personal'
				}, {
					title: '我的收藏', label: '查看收藏列表', icon: 'icon-favorite', iconColor: '#00B358',
					path: '/collection'
				}, 
				// {
				// 	title: '推荐好友', label: '成为事业合伙人，获取丰厚收益', icon: 'icon-friends', iconColor: '#0969A2', path: '/getFans'
				// },
				{
					title: '我的推荐', label: '您的粉丝', icon: 'icon-recommando', iconColor: '#a62800', path: '/fans'
				}],
				aboutNavs: [{
					title: '租赁规则', label: '查看租赁规则', path: '/rule'
				}, {
					title: '关于我们', label: '享受租赁，享受生活', path: '/about'
				}]
			}
		},
		components: {
			'bar-bottom': BarBottom
			// 'bar-top': BarTop
		},
		computed: {
			...mapState(['userInfo'])
		},
		created() {
			this.$nextTick(() => {
				this.getUserInfo()
			})
		},
		methods: {
			async getUserInfo() {
				try {
					const user = await this.$store.dispatch('GET_USER_INFO')
					console.log(user)
				} catch(e) {
					console.log(e)
					this.$router.push('/login')
				}
				
			},
			logOut() {
				this.$store.dispatch('LOGOUT')
				this.$router.push('/login')
			},
			jump(path) {
				this.$router.push(path)
			}
		}
	}
</script>
<style lang="scss">
	.personal {
		.scroll-wrapper {
			height: calc(100vh - 2.5rem);
			margin-bottom: 2.5rem;
			box-sizing: border-box;
			overflow: auto;
			-webkit-overflow-scrolling: touch;
			.head {
				width: 100%;
				background: #00bbe4;
				height: 5rem;
				box-sizing: border-box;
				padding: 1.2rem 1rem;
				display: flex;
				border-bottom-left-radius: 50% 1rem;
				border-bottom-right-radius: 50% 1rem;
				.image-wrapper {
					width: 2.6rem;
					height: 2.6rem;
					box-sizing: border-box;
					border: 2px solid #fff;
					overflow: hidden;
					border-radius: 50%;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.nick-name {
					font-size: .65rem;
					color: #fff;
					margin-left: .5rem;
				    text-align: center;
				    display: flex;
				    flex-direction: column;
				    justify-content: space-around;
					.vip {
						width: 3rem;
						border-radius: .3rem;
						background: rgba(240, 240, 240, .5);
						text-align: center;
					}
				}
			}
			.navs {
				margin-top: 1rem;
				border-bottom: 1rem solid #eee;
				padding-bottom: 1rem;
				.mint-cell-wrapper {
					padding: 0 1rem;
				}
				.iconfont {
					vertical-align: middle;
				}
			}
			.logout {
				a {
					display: inline-block;
					height: 2.5rem;
					width: 100%;
					margin: 1rem auto;
					background: #ddd;
					color: #fff;
					text-align: center;
					font-size: .85rem;
					line-height: 2.5rem;
				}
			}
		}
	}
</style>