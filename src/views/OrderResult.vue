<template>
	<div class="order-result">

	</div>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		data() {
			return {
				title: '地址管理'
			}
		},
		components: {
			'bar-top': BarTop
		},
		computed: {
			...mapState(['addresses'])
		},
		created() {
			this.$nextTick(() => {
				this.getAddress()
			})
		},
		methods: {
			getAddress() {
				this.$store.dispatch('GET_ADDRESS')
			}
		}
	}
</script>

<style lang="scss">
	.addresses {

	}
</style>