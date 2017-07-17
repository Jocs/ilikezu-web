<template>
	<div class="create-addresses">
		<bar-top
			:text="title"
		></bar-top>
		<div class="scroll-wrapper">
			<div class="form-controller">
				<label class="label">收货人：</label>
				<input type="text" placeholder="请填写收货人姓名"
					v-model="formData.contactName"
				>
			</div>
			<div class="form-controller">
				<label class="label">联系方式：</label>
				<input type="number" placeholder="请填写收货人手机号码"
					v-model="formData.contactNumber"
				>
			</div>
			<div class="form-controller"
				@click="showPopUp"
			>
				<label class="label">所在地区：</label>
				<span>{{addressStr}}</span>
				<i class="iconfont icon-more"></i>
			</div>
			<div class="form-controller">
				<label class="label">详细地址：</label>
				<input type="text" placeholder="请输入详细收货地址"
					v-model="formData.address"
				>
			</div>
		</div>
		<div class="bar-bottom">
			<a href="javascript:;" @click="submit">保存</a>
		</div>
		<address-selector
			:pro-id="params.proId"
			:city-id="params.cityId"
			:dis-id="params.disId"
			:popup="popup"
			:fetch="fetch"
			@close="handleClose"
			@select="handleSelect($event)"
		></address-selector>
	</div>
</template>

<script>
	import BarTop from '../components/barTop.vue'
	import AddressSelector from '../components/addressSelector.vue'
	import { errorTip } from '../common/util'
	import { mapState } from 'vuex'

	export default {
		data() {
			return {
				title: '新建收货人',
				type: 'create',
				recordId: '',
				fetch: false,
				popup: false, // 是否显示popup
				params: {
					proId: '-1',
					cityId: '-1',
					disId: '-1',
				},
				formData: {
					proId: '',
					cityId: '',
					disId: '',
					address: '',
					contactName: '',
					contactNumber: ''
				},
				addressSet: {
					proName: '',
					cityName: '',
					disName: ''
				}
			}
		},
		components: {
			'bar-top': BarTop,
			'address-selector': AddressSelector
		},
		computed: {
			...mapState(['addresses']),
			addressStr() {
				const addressSet = this.addressSet
				return Object.keys(addressSet).map(k => addressSet[k]).join('-')
					.replace(/[-]{2, 3}/g, '-')
					.replace(/^[-]{1,}|[-]{1,}$/g, '')
			}
		},
		created() {
			this.$nextTick(() => {
				if (/editAddress/.test(this.$route.path)) {
					this.getAddress()
						.then(() => {
							const { recordId } = this.$route.params
							const singleAddress = this.addresses.filter(a => a.recordId === +recordId)[0]
							this.recordId = recordId
							this.type = 'edit'
							const { proId, cityId, disId, contactName, address, contactNumber } = singleAddress
							Object.assign(this.formData, { proId, cityId, disId, contactName, address, contactNumber})
							Object.assign(this.params, {proId, cityId, disId})
							this.fetch = true
						})
				} else {
					this.type === 'create'
					this.recordId = ''
					this.fetch = true
				}
			})
		},
		methods: {
			getAddress() {
				return this.$store.dispatch('GET_ADDRESS')
			},
			showPopUp() {
				this.popup = true
			},
			handleClose() {
				this.popup = false
			},
			validForm() {
				const formData = this.formData
				const isValid = Object.keys(formData).every(k => {
					if (k === 'proId' || k === 'cityId' || k === 'disId') {
						return formData[k] !== '-1'
					} else {
						return !!formData[k]
					}
				})
				return isValid ? true : '收货人信息填写不全'
			},
			submit() {
				const validation = this.validForm(this.formData)
				if (typeof validation === 'string') return errorTip(validation)
				const params = this.type === 'create' ? this.formData : Object.assign({}, this.formData, {recordId: this.recordId})
				this.$store.dispatch('UPDATE_ADDRESS', params)
					.then(res => {
						if (res.isSuccess) {
							this.$router.back()
						} else {
							return Promise.reject(res.msg)
						}
					})
					.catch(msg => {
						typeof msg === 'string' ? errorTip(msg) : errorTip('更新地址失败')	
					})
			},
			handleSelect(event) {
				if (event[0]) {
					this.formData.proId = String(event[0].recordId)
					this.addressSet.proName = event[0].name
				}
				if (event[1]) {
					this.formData.cityId = String(event[1].recordId)
					this.addressSet.cityName = event[1].name
				}
				if (event[2]) {
					this.formData.disId = String(event[2].recordId)
					this.addressSet.disName = event[2].name
				}

			}
		}
	}
</script>

<style lang="scss">
	.create-addresses {
		.scroll-wrapper {
			height: calc(100vh - 4.7rem);
			margin-top: 2.2rem;
			margin-bottom: 2.5rem;
			box-sizing: border-box;
			overflow: auto;
			-webkit-overflow-scrolling: touch;
			background: #fff;
			padding-top: 2.5rem;
			.form-controller {
				height: 2.2rem;
				padding: 0 .5rem;
				border-bottom: 1px solid #eee;
				display: flex;
				line-height: 2.2rem;
				label.label {
					font-size: .65rem;
					color: #333;
				}
				input, span {
					outline: none;
					border: none;
					flex: 1;
					font-size: .65rem;
					color: #333;
				}

				i {
					font-size: 1rem;
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
			background: #00bbe4;
			color: #fff;
			text-align: center;
			line-height: 2.5rem;
			a {color: #fff;}
		}
	}
</style>