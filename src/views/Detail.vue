<template>
	<div class="detail">
		<bar-top
			:text="title"
		></bar-top>
		<div class="scroll-wrapper">
			<div class="lz-swipper">
				<mt-swipe :auto="4000">
					<mt-swipe-item
						v-for="(img, index) of product.picList"
						:key="index"
					>
						<img :src="img" alt="">
					</mt-swipe-item>
				</mt-swipe>
			</div>
			<div class="head">
				<div class="title">{{product.detail.title}}</div>
				<div class="description">{{product.detail.describer}}</div>
				<div class="price">
					<div class="price-number"><span class="icon">¥&nbsp;</span><span>{{product.detail.price | fixed}}</span></div>
					<div class="price-des">{{product.detail.baseDay + '天起租'}}</div>
				</div>
				<div class="yajin">
					线下支付押金：¥<span>{{product.detail.yajin | fixed}}</span>
				</div>
			</div>
			<div class="info">
				<div class="item title">
					<i class="iconfont icon-information"></i>&nbsp;商品详情
				</div>
				<div class="item">
					<label>所在地区：</label>
					<span>上海市-上海市</span>
				</div>
				<div class="item">
					<label>上线时间：</label>
					<span>{{product.detail.addTime}}</span>
				</div>
				<div class="item">
					<label>产品购入价格：</label>
					<span>{{product.detail.orgPrice | fixed}} 元</span>
				</div>
				<div class="item">
					<label>产品购入日期：</label>
					<span>{{product.detail.inTime}}</span>
				</div>
				<div class="item">
					<label>产品成色：</label>
					<span>{{product.detail.chengse}} 成新</span>
				</div>
			</div>
			<lz-content
				:content="product.content"
			></lz-content>
		</div>
		<div class="bottom">
			<div class="star"
				@click="handleCollect"
			>
				<i class="iconfont"
					:class="{'icon-favorite': !collected, 'icon-favoritesfilling': collected}"
				></i>
				<span>{{collected ? '已关注': '关注'}}</span>
			</div>
			<div class="order" @click="goOrder">
				立即下单
			</div>
		</div>
	</div>
</template>

<script>
	import BarTop from '../components/barTop.vue'
	import Content from '../components/content.vue'
	import { Indicator } from 'mint-ui'
	import { mapState } from 'vuex'

	export default {
		components: {
			'bar-top': BarTop,
			'lz-content': Content
		},
		data() {
			return {
				title: '物品详情',
				recordId: ''
			}
		},
		computed: {
			...mapState(['product', 'collected', 'isLogin'])
		},
		watch: {
			product(val) {
				// console.log(val.collected)
			}
		},
		beforeCreate() {
			this.$store.dispatch('RESET_PRODUCT')
		},
		created() {
			this.$nextTick(() => {
				const { recordId } = this.$route.params
				this.recordId = recordId
				this.getProduct()
				// setTimeout(() => this.checkCollect(), 1000)
				this.checkCollect()
			})
		},
		methods: {
			getProduct() {
				Indicator.open({
					text: '加载中...',
					spinnerType: 'fading-circle'
				})
				const { recordId } = this
				this.$store.dispatch('GET_PRODUCT', {recordId})
					.then(res => {
						Indicator.close()
					})
			},
			checkCollect() {
				this.$store.dispatch('CHECK_COLLECT', {
					tag: 'product',
					relatedId: this.recordId
				})
			},
			handleCollect() {
				// console.log('star')
				if (!this.isLogin) return this.$router.push('/login')
				const params = {
					tag: 'product',
					relatedId: this.recordId
				}
				const action = this.collected ? 'CANCEL_COLLECT' : 'ADD_COLLECT'
				this.$store.dispatch(action, params)
			},
			async goOrder() {
				if (this.isLogin) {

					const { data } = await this.$store.dispatch('CHECK_IS_LOGIN')
					if (data && data.isWeixin) {
						this.$router.push(`/order/${this.recordId}`)
					} else {
						this.$router.push('/login')
					}

				} else {
					this.$router.push('/login')
				}
			}
		}
	}
</script>

<style lang="scss">
	.detail {
		background: #eee;
		position: relative;
		.spinner-wrapper {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translateY(-50%) translateX(-50%);
			width: 4.5rem;
			height: 4.5rem;
			border-radius: .4rem;
			background: rgba(0, 0, 0, .7);
			text-align: center;
			padding-top: 1.2rem;
			box-sizing: border-box;
			.text {
				color: #fff;
			}
		}
		.scroll-wrapper {
			height: calc(100vh - 4.7rem);
			margin-top: 2.2rem;
			margin-bottom: 2.5rem;
			box-sizing: border-box;
			overflow: auto;
			-webkit-overflow-scrolling: touch;
			.lz-swipper {
				width: 100%;
				height: 12rem;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.head {
				background: #fff;
				padding: .5rem .5rem;
				.title {
					font-size: .85rem;
				}
				.description {
					font-size: .75rem;
					color: #e9321f;
					text-decoration: underline;
				}
				.price {
					display: flex;
					justify-content: space-between;
					height: 2rem;
				    padding-top: .85rem;
				    border-bottom: 1px solid #eee;
					.price-number {
						color: #e9321f;
						font-size: 1rem;
						text-align: left;
						.icon {
							font-size: .75rem;
						}
					}
					.price-des {
						width: 5rem;
						text-align: right;
						color: #999;
						padding-right: .3rem;
					}
				}
				.yajin {
					margin-top: .3rem;
					font-size: .75rem;
					color: #999;
				}
			}
			.info {
				margin-top: .5rem;
				padding: .5rem;
				background: #fff;
				.title {
					font-size: .8rem;
				}
				.item {
					height: 2.5rem;
					font-size: .75rem;
					padding: .75rem 0;
					box-sizing: border-box;
					border-bottom: 1px solid #eee;
					label {
						display: inline-block;
						width: 6rem;
						text-align: right;
						color: #666;
					}
					span {

					}
				}
			}
			.content {
				margin-top: .5rem;
				padding: .5rem;
				background: #fff;
			}
		}
		.bottom {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			width: 100%;
			height: 2.5rem;
			display: flex;
			.star, .order {
				width: 50%;
			}
			.order {
				background: #e9321f;
				color: #fff;
				text-align: center;
				line-height: 2.5rem;
			}
			.star {
				background: #fff;
				display: flex;
				flex-direction: column;
				text-align: center;
				font-size: .65rem;
				i {
					margin-top: .3rem;
					font-size: 1rem;
				}
				i.icon-favoritesfilling {
					color: #e9321f;
				}
			}
		}
	}
</style>