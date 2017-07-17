<template>
	<div class="address-selector">
		<mt-popup
			v-model="isPopUp"
			position="bottom"
			:close-on-click-modal="false"
		>
			<div class="tool-bar">
				<a href="javascript:;" @click="close" class="cancel">取消</a>
				<a href="javascript:;" @click="close" class="ok">确认</a>
			</div>
			<mt-picker 
				:slots="slots" @change="onValuesChange"
				value-key="name"
				:show-toolbar="false"
			></mt-picker>
		</mt-popup>
	</div>
</template>

<script>
	import { mapState } from 'vuex'

	const pro = [{recordId: '-1', name: '选择省份'}]
	const city = [{recordId: '-1', name: '选择城市'}]
	const dis = [{recordId: '-1', name: '选择区县'}]

	export default {
		data() {
			return {
				slots: [
					{
						flex: 1,
						values: [...pro],
						className: 'slot1',
						textAlign: 'right',
						defaultIndex: 0
					}, {
						divider: true,
						content: '-',
						className: 'slot2'
					}, {
						flex: 1,
						values: [...city],
						className: 'slot3',
						textAlign: 'center'
			        }, {
						divider: true,
						content: '-',
						className: 'slot2'
					}, {
						flex: 1,
						values: [...dis],
						className: 'slot3',
						textAlign: 'left'
			        }
				],
				lastProId: this.proId,
				lastCityId: this.cityId
			}
		},
		props: {
			proId: [String, Number],
			cityId: [String, Number],
			disId: [String, Number],
			popup: Boolean,
			fetch: Boolean
		},
		computed: {
			...mapState(['proviences', 'cities', 'dises']),
			isPopUp() {
				return this.popup
			}
		},
		watch: {
			fetch(val) {
				val === true && this.getAddressList()
			},
			proviences(val) {
				console.log(this.proId)
				if (val && Array.isArray(val) && val.length) {
					this.slots[0].values = [...pro, ...val]
					this.slots[0].defaultIndex = this.slots[0].values.findIndex(v => v.recordId === +this.proId)
				}
			},
			cities(val) {
				if (val && typeof val === 'object' && Object.keys(val).length > 1) {
					this.slots[2].values = [...city, ...val[this.proId]]
					this.slots[2].defaultIndex = this.slots[2].values.findIndex(v => v.recordId == this.cityId)
				}
			},
			dises(val) {
				if (val && typeof val === 'object' && Object.keys(val).length > 1) {
					this.slots[4].values = [...dis, ...val[this.cityId]]
					this.slots[4].defaultIndex = this.slots[4].values.findIndex(v => v.recordId == this.disId)
				}
			}
		},
		created() {
		},
		methods: {
			getAddressList() {
				this.$store.dispatch('GET_ADDRESS_LIST', {type: 'pro'})
				this.$store.dispatch('GET_ADDRESS_LIST', {type: 'city'})
				this.$store.dispatch('GET_ADDRESS_LIST', {type: 'dis'})
			},
			onValuesChange(picker, values) {
				this.$emit('select', values)

				if (this.proviences.length === 0) return false
				if (Object.keys(this.cities).length <= 1) return false
				if (Object.keys(this.dises).length <= 1) return false

				console.log(values)
				if (values[0] && values[0].recordId !== +this.lastProId) {
					this.lastProId = values[0].recordId
					this.slots[2].values = [...city, ...this.cities[values[0].recordId]]
				} else if (values[1] && values[1].recordId !== +this.lastCityId) {
					this.lastCityId = values[1].recordId
					this.slots[4].values = [...dis, ...this.dises[values[1].recordId]]
				}
			},
			close() {
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss">
	.address-selector {
		.tool-bar {
			height: 2.2rem;
			padding: 0 1.5rem;
			line-height: 2.2rem;
			a {
				width: 4rem;
				height: 2.2rem;
				text-align: center;
				font-size: .75rem;
				color: #333;
			}
			.cancel {
				float: left;
			}
			.ok {
				float: right;
			}
		}
		.mint-popup {
			width: 100%;
			.picker-slot-wrapper, .picker-item {
				backface-visibility: hidden;
			}		
		}

	}
</style>