<template>
	<div class="orders">
		<bar-top
			:text="title"
		></bar-top>
		<div 
			class="scroll-container"
			v-infinite-scroll="loadMore"
  			infinite-scroll-disabled="orLoading.status"
			infinite-scroll-distance="10"
			v-if="orderList.length"
		>
			<div 
				v-for="(order, index) of orderList"
				:key="index"
				class="order-item"
			>
				<div class="no-status">
					<div>订单号：<span>{{order.tradeNo}}</span></div>
					<div class="status"
						:class="{'un-pay': order.status === 0}"
					>{{order.status === 0 ? '未支付': '已支付'}}</div>
				</div>
				<product
					:product="order.product"
				></product>
				<div class="time">
					<div>开始时间：{{order.addTime ? order.addTime.split(' ')[0]:''}}</div>
					<div v-if="order.deliverTime">送货时间：{{order.deliverTime ? order.deliverTime.split(' ')[0]: ''}}</div>
				</div>
				<div class="exp">
					<span>
						租期{{order.number}}天
					</span>
				</div>
				<div class="tool" v-if="order.status === 0">
					<a href="javascript:;" @click="cancelOrder(order.tradeNo)">取消订单</a>
					<a href="javascript:;" class="go-pay" @click="reOrder(order.tradeNo)">去支付</a>
				</div>
			</div>
			<div v-if="orLoading.status" class="loading">
				<div v-if="orLoading.hasMore" class="more">
					<mt-spinner type="fading-circle"></mt-spinner>&nbsp;拼命加载中...
				</div>
				<div v-if="!orLoading.hasMore" class="nomore">
					<i class="iconfont icon-sorry"></i>&nbsp;没有更多内容...
				</div>
			</div>
		</div>
		<div class="no-data" v-if="!orderList.length">
			<div class="icon-container">
				<i class="iconfont icon-sorry"></i>
			</div>
			<div>您还没有订单，赶紧去租您想要的商品吧。</div>
		</div>
	</div>
</template>

<script>
	import BarTop from '../components/barTop.vue'
	import Product from '../components/product.vue'
	import { errorTip, wxPay } from '../common/util'
	import { mapState } from 'vuex'
	import { MessageBox } from 'mint-ui'

	export default {
		data() {
			return {
				title: '全部订单'
			}
		},
		components: {
			'bar-top': BarTop,
			'product': Product
		},
		computed: {
			...mapState(['orderList', 'orLoading'])
		},
		created() {
			this.$nextTick(() => {
				this.getOrders({from: 0, max: 4})
			})
		},
		methods: {
			getOrders(params) {
				this.$store.dispatch('GET_ORDERS', params)
				// console.log(this.orderList)
			},
			loadMore() {
				this.$store.dispatch('GET_ORDERS', {from: this.orderList.length, max: 2})
			},
			async cancelOrder(tradeNo) {
				try {
					await MessageBox.confirm('确定取消订单吗？')
					const res = await this.$store.dispatch('CANCEL_ORDER', {tradeNo})
					if (res.isSuccess) {
						errorTip('成功取消订单')
						this.getOrders({from: 0, max: 4})
					} else {
						throw new Error('取消订单失败')
					}
				} catch(e) {
					console.log(e)
					if(e !== 'cancel') {
						errorTip('取消订单失败')
					}
				}
			},
			async reOrder(tradeNo) {
				try {
					const result = await this.$store.dispatch('WECHAT_PAY', { tradeNo })

					if (result && result.data && result.data.params) {
						wxPay(result.data.params, res => {
							console.log(res)
							if (res.err_msg === 'get_brand_wcpay_request:ok') {
								this.$router.push('/orderResult')
							} else {
								console.log(res.errMsg)
							}
						})
					} else {
						throw new Error('获取微信支付参数失败')
					}			
				} catch(e) {
					console.log(e)
					errorTip('支付失败')
				}

			}
		}
	}
</script>

<style lang="scss">
	.orders {
		.no-data {
			padding-top: 5rem;
			text-align: center;
			font-size: .75rem;
			color: #333;
			.icon-container {
				margin-bottom: .5rem;
				i {
					font-size: 1rem;
					color: orange;
				}
			}

		}
		.scroll-container {
			height: calc(100vh - 2.2rem);
			margin-top: 2.2rem;
			overflow: auto;
			background: #eee;
			-webkit-overflow-scrolling: touch;
			.order-item {
				background: #fff;
				margin-bottom: .5rem;
				padding: .3rem .5rem;
				color: #333;
				font-size: .75rem;
				.no-status {
					display: flex;
					.status {
						flex: 1;
						text-align: right;
					}
					.un-pay {
						color: #dd0603;
					}
				}
				.time {
					display: flex;
					div {
						flex: 1;
					}
				}
				.exp {
					border-bottom: 1px solid #eee;
					padding-bottom: .3rem;
					margin-bottom: .5rem;
					line-height: 1.5rem;
				}
				.tool {
					height: 1.3rem;	
					a {
						float: right;
						margin-right: .5rem;
						color: #333;
					}
					.go-pay {
						color: #dd0603;
					}
				}
			}
			.loading {
				height: 2rem;
				text-align: center;
    			font-size: .6rem;
    			padding-top: .6rem;
    			.nomore {
    				color: #999;
    			}
    			.more {
    				color: #999;
    				font-size: .6rem;
					span {
						display: inline-block;
						vertical-align: middle;
					}
    			}
			}
		}
	}
</style>