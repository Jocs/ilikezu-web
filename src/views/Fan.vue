<template>
	<div class="addresses">
		<bar-top
			:text="title"
		></bar-top>
		fan list
	</div>
</template>

<script>
	import BarTop from '../components/barTop.vue'
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
				this.$store.dispatch('GET_FANS')
			}
		}
	}
</script>

<style lang="scss">
	.addresses {

	}
</style>