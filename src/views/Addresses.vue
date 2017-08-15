<template>
	<div class="addresses">
		<bar-top
			:text="title"
		></bar-top>
		<div class="scroll-wrapper">
			<div class="has-address"
				v-if="addresses.length"
			>
				<ul>
					<li 
						v-for="(a, index) of addresses"
						:key="index"
						class="cell"
					>
						<div class="info"
							@click="select(a)"
						>
							<span class="radio not-select"
								:class="{'select': a.recordId === selectAddress.recordId}"
								v-if="from === 'order'"
							>
								<i class="iconfont icon-selected"></i>
							</span>
							<div class="left-info">
								<div class="name-mobile">
									<span class="name">{{a.contactName}}</span>
									<span class="mobile">{{a.contactNumber | mobile}}</span>
								</div>
								<div class="address">{{a.address}}</div>	
							</div>
						</div>
						<div class="edit">
							<a 
								href="javascript:;"
								@click="deleteAddress(a.recordId)"
							><i class="iconfont icon-delete"></i>&nbsp;删除</a>
							<a href="javascript:;"
								@click="editAddress(a.recordId)"
							><i class="iconfont icon-edit"></i>&nbsp;编辑</a>
						</div>
					</li>
				</ul>
			</div>
			<div class="no-address"
				v-if="!addresses.length"
			>
				<i class="iconfont icon-cry"></i>
				<div>您还没有收货地址，点击下面按钮添加。</div>
			</div>
		</div>
		<div class="bar-bottom">
			<a href="javascript:;" 
				@click="useAddress"
				class="use"
				:class="{'in-active': addresses.length === 0}"
				v-if="from === 'order'"
			>立即使用</a>
			<a 
				class="add"
				href="javascript:;"
				@click="create"
			>添加地址</a>
		</div>
	</div>
</template>

<script>
	import BarTop from '../components/barTop.vue'
	import { MessageBox } from 'mint-ui'
	import { mapState } from 'vuex'
	import { errorTip } from '../common/util'

	export default {
		data() {
			return {
				title: '地址管理',
				from: 'personal',
				selectAddress: {
					recordId: ''
				}
			}
		},
		components: {
			'bar-top': BarTop
		},
		computed: {
			...mapState(['addresses', 'defaultAddress'])
		},
		created() {
			this.$nextTick(async () => {
				const { from } = this.$route.params
				this.from = from
				const addresses = await this.getAddress()
				if (from === 'order' && this.defaultAddress) {
					this.selectAddress = this.defaultAddress
				} else if (addresses.length > 0) {
					this.selectAddress = addresses[0]
				}
			})
		},
		methods: {
			async getAddress() {
				const { from } = this
				try {
					const res = await this.$store.dispatch('GET_ADDRESS')
					if (Array.isArray(res)) return res
				} catch (e) {
					errorTip(e)
					return []
				}
			},
			select(a) {
				this.selectAddress = a
			},
			create() {
				this.$router.push('/createAddress')
			},
			editAddress(recordId) {
				this.$router.push(`/editAddress/${recordId}`)
			},
			async deleteAddress(addressId) {
				try {
					await MessageBox.confirm('确定删除此收货地址？')
					const res = await this.$store.dispatch('DELETE_ADDRESS', { addressId })
					if (res.isSuccess) {
						const addresses = await this.getAddress()
						if (addressId === this.selectAddress.recordId) {
							if (addresses.length > 0) {
								this.selectAddress = addresses[0]
							} else {
								this.selectAddress = {
									recordId: ''
								}
							}
						}
						if (addressId === this.defaultAddress.recordId) {
							this.$store.dispatch('GET_DEFAULT_ADDRESS', null)
						}
					} else {
						throw new Error(res.msg)
					}
				} catch (e) {
					console.log(e)
				}
			},
			useAddress() {
				if (this.selectAddress.recordId) {
					this.$store.dispatch('GET_DEFAULT_ADDRESS', this.selectAddress)
				}
				this.$router.back()
			}
		}
	}
</script>

<style lang="scss">
	.addresses {
		.scroll-wrapper {
			height: calc(100vh - 4.7rem);
			margin-top: 2.2rem;
			margin-bottom: 2.5rem;
			box-sizing: border-box;
			overflow: auto;
			-webkit-overflow-scrolling: touch;
			background: #eee;
			.has-address {
				li {
					width: 100%;
					height: auto;
					padding: .5rem;
					box-sizing: border-box;
					margin-bottom: .5rem;
					margin-top: .5rem;
					background: #fff;
					.info {
						display: flex;
						border-bottom: 1px solid #eee;
						align-items: flex-start;
						.radio {
							margin-right: .5rem;
							width: 1rem;
							height: 1rem;
							border-radius: 50%;
							position: relative;
							box-sizing: border-box;
						}
						.not-select {
							border: 1px solid #ccc;
							i {display: none;}
						}
						.select {
							background: #00bbe4;
							border: none;
							i {
								display: block;
								position: absolute;
								top: 0;
								left: 0;
								color: #fff;
								font-weight: 900;
								font-size: 1rem;
							}
						}
						.left-info {
							flex: 1;
						}
					}
					.name-mobile {
						font-size: .75rem;
						color: #666;
						margin-bottom: .5rem;
					}
					.address {
						color: #999;
						font-size: .65rem;
						padding-bottom: 1rem;
					}
					.edit {
						height: 1.5rem;
						a {
							float: right;
							margin-left: .5rem;
							font-size: .6rem;
							color: #999;
							line-height: 2rem;
						}
					}
				}
			}
			.no-address {
				padding-top: 8rem;
				text-align: center;
				height: calc(100vh - 4.7rem);
				box-sizing: border-box;
				background: #fff;
				i {
					font-size: 1.5rem;
					color: #666;
				}
				div {
					font-size: .75rem;
					color: #666;
				}
			}
		}
		.bar-bottom {
			width: 100%;
			height: 2.5rem;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			color: #fff;
			text-align: center;
			line-height: 2.5rem;
			display: flex;
			a {
				flex: 1;
			}
			a.add {color: #fff;background: #00bbe4;}
			a.use {color: #00bbe4; background: #fff;}
			a.use.in-active {
				color: #eee;
			}
		}
	}
</style>