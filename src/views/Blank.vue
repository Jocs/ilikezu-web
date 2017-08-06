<template>
	<div class="blank">
	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		components: {
		},
		computed: {

		},
		created() {
			this.$nextTick(async () => {
				const { path, ukey } = this.$route.params
				console.log(path, ukey)
				if (ukey) {
					await this.$store.dispatch('LOGIN_STATUS_SET', {status: true, key: ukey})
					this.$router.push(`/${path}`)
				} else {
					this.$router.push('/login')
				}
			})
		},
		methods: {
		}
	}
</script>

<style lang="scss">
	.blank {

	}
</style>