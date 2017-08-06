<template>
	<div class="order">
		<bar-top :text="title"></bar-top>
		<div class="scroll-wrapper">
			<div class="spinner-wrapper"
				v-if="!product.detail.logoUri"
			>
				<mt-spinner type="triple-bounce" color="#26a2ff"></mt-spinner>
			</div>
			<product
				:product="product.detail"
				v-if="product.detail.logoUri"
			></product>
			<section class="select">
				<div class="title">选择信息</div>
				<article class="day">
					<label>
						<i class="iconfont icon-date"></i>&nbsp;租赁天数
					</label>
					<div class="day-selector">
						<i class="iconfont icon-subtract"
							@click="updateNumber(-1)"
						></i>
						<input type="number" v-model="number"
							@input="handleInput($event)"
						>
						<i class="iconfont icon-add"
							@click="updateNumber(1)"
						></i>
					</div>
				</article>
				<article class="date">
					<label>
						<i class="iconfont icon-time"></i>&nbsp;送货日期
					</label>
					<div class="mock-input"
						@click="openDatePicker"
					>
						{{showPickerValue}}
					</div>
				</article>
				<article 
					class="address"
					@click="addressClick"
				>
					<div class="address-left">
						<i class="iconfont icon-address1"></i>
						<div v-if="!defaultAddress">请添加收货地址</div>
						<div class="address-info" v-if="defaultAddress">
							<div>{{defaultAddress.address}}</div>
							<div class="name"><span>{{defaultAddress.contactName}}</span>
							&nbsp;<span>{{defaultAddress.contactNumber}}</span></div>
						</div>
					</div>
					<i class="iconfont icon-more"></i>
				</article>
			</section>
			<section class="total select">
				<article>
					<label>
						<i class="iconfont icon-zu"></i>
					租金</label>
					<div class="money">¥&nbsp;{{product.detail.price * number | fixed}}</div>
				</article>
				<article>
					<label>
						<i class="iconfont icon-yajin"></i>
					押金</label>
					<div class="money">¥&nbsp;{{product.detail.yajin | fixed}}</div>
				</article>
			</section>
		</div>
		<div class="bar-bottom">
			<div>
				实付金额：<span class="money">¥{{total | fixed}}</span>
			</div>
			<div class="weixin" @click="order">微信支付</div>
		</div>
		<mt-datetime-picker
			ref="datePicker"
			type="date"
			v-model="pickerValue"
			year-format="{value} 年"
			month-format="{value} 月"
			date-format="{value} 日">
		</mt-datetime-picker>
	</div>
</template>

<script>
	import BarTop from '../components/barTop.vue'
	import Product from '../components/product.vue'
	import { errorTip, wxPay } from '../common/util'
	// import { DatetimePicker } from 'mint-ui'

	import { mapState } from 'vuex'

	const tomorow = new Date(+new Date() + 24 * 3600 * 1000).toLocaleString().split(' ')[0] + ' 00:00:00'
	console.log(new Date(tomorow))
	export default {
		components: {
			BarTop, Product
		},
		data() {
			return {
				title: '确认订单',
				recordId: '',
				number: 0,
				pickerValue: new Date(tomorow)
			}
		},
		computed: {
			...mapState(['product', 'defaultAddress']),
			showPickerValue() {
				return this.pickerValue.toLocaleString().split(' ')[0]
			},
			total() {
				return this.product.detail.price * this.number + this.product.detail.yajin
			}
		},
		watch: {
			product(val) {
				this.number = val.detail.baseDay
			}
		},
		created() {
			this.$nextTick(() => {
				const { recordId } = this.$route.params
				this.recordId = recordId
				this.getProduct()
				this.getAddressAndSetDefault()
			})
		},
		methods: {
			getAddressAndSetDefault() {
				this.$store.dispatch('GET_ADDRESS')
					.then(res => {
						if (!this.defaultAddress) {
							this.$store.dispatch('GET_DEFAULT_ADDRESS', res[0])
						}
					})
					.catch(errorTip)
			},
			getProduct() {
				const { recordId } = this
				this.$store.dispatch('GET_PRODUCT', {recordId})
			},
			updateNumber(step) {
				if (step < 0 && +this.number <= +this.product.detail.baseDay) {
					return false
				}
				this.number = +this.number + step
			},
			handleInput(event) {
				if (event.target.value < 0) 
					this.number = this.product.detail.baseDay
			},
			openDatePicker() {
				this.$refs.datePicker.open()
			},
			addressClick() {
				if (this.defaultAddress) {
					this.$router.push('/addresses/order')
				} else {
					this.$router.push('/createAddress')
				}
			},
			/**
			 * 下单，获取订单号
			 */
			async order() {
				// { proId: Long, addressId: Long, number: Integer, deliverTime: TimeStamp }
				const { recordId: proId } = this.product.detail
				const { recordId: addressId } = this.defaultAddress
				const { number, pickerValue } = this
				const deliverTime = +pickerValue

				try {
					const { data } = await this.$store.dispatch('ORDER', {
						proId, addressId, number, deliverTime
					})

					if (data && data.tradeNo) {
						console.log(data.tradeNo)
						const { tradeNo } = data
						const result = await this.$store.dispatch('WECHAT_PAY', {
							tradeNo
						})
						if (result && result.data && result.data.params) {
							wxPay(result.data.params, res => {
								console.log(res)
								if (res.err_msg === 'get_brand_wcpay_request:ok') {
									this.$router.push('/orderResult')
								} else {
									console.log(res.errMsg)
								}
							})
						}
					} else {
						throw new Error('failed in order')
					}

				} catch(e) {
					console.log(e)
					errorTip('下单失败，请稍候再试！')
				}

			}
		}
	}
</script>

<style lang="scss">
	.order {
		.money {
			color: #dd0603;
		}
		.scroll-wrapper {
			height: calc(100vh - 4.7rem);
			margin-top: 2.2rem;
			margin-bottom: 2.5rem;
			box-sizing: border-box;
			overflow: auto;
			-webkit-overflow-scrolling: touch;
			.spinner-wrapper {
				text-align: center;
				line-height: 5rem;
				height: 5rem;
			}
			.select {
				padding-bottom: 1rem;
				.title {
					padding: 0 .5rem;
					margin-top: 1rem;
					font-size: .75rem;
					color: #777;
					line-height: 1.8rem;
					border-bottom: 1px solid #eee;
				}
				article {
					border-bottom: 1px solid #eee;
					box-sizing: border-box;
					height: 2.2rem;
					line-height: 2.2rem;
					padding: 0 .5rem;
					font-size: .65rem;
					color: #666;
					display: flex;
					justify-content: space-between;
					.mock-input {
						width: 5rem;
						flex: 1;
						height: 2.2rem;
						text-align: right;
						padding-right: .5rem;
					}
					label {
						display: inline-block;
						width: 5rem;
						i {
							font-size: .75rem;
						}
					}
					input {
						outline: none;
					}
					input[type="number"] {
						width: 2rem;
						border: 1px solid #999;
						border-radius: 0;
						box-shadow: none;
						height: 1.2rem;
						margin-bottom: .2rem;
						font-size: .75rem;
						text-align: center;
					}
					i.icon-add, i.icon-subtract {
						font-size: 1rem;
						font-weight: 900;
						vertical-align: middle;
					}
				}
				article.address {
					height: auto;
					align-items: center;
					i {display: inline-block; line-height: auto;}
					.icon-more {
						display: inline-block;
						width: 2rem;
						flex: 0;
						flex-shrink: 0;
						text-align: right;
					}
					display: flex;
					.address-left {
						display: flex;
						flex: 1;
						align-items: center;
						.address-info {
							padding-top: .2rem;
						    margin-left: .2rem;
						    line-height: .95rem;
							.name {
								font-size: .65rem;
							}
						}
					}
				}
			}
			.total {
				border-top: 1rem solid #eee;
			}
		}
		.bar-bottom {
			border-top: 1px solid #eee;
			width: 100%;
			height: 2.5rem;
			display: flex;
			background: #fff;
			line-height: 2.5rem;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			color: #666;
			& > div {flex: 1; text-align: center;}
			.weixin {
				background: #dd0603;
				color: #fff;
			}
		}
	}
</style>