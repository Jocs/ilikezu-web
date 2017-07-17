<template>
	<div class="search-bar">
		<form action="" @submit="handleSubmit($event)">
			<mt-search 
				v-model="currentValue"
				@input="handleInput($event)"
				cancel="取消"
				placeholder="搜索你想要的商品"
			></mt-search>
		</form>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				currentValue: this.value
			}
		},
		watch: {
			value(val) {
				this.currentValue = val
			}
		},
		props: {
			value: {
				type: String
			}
		},
		methods: {
			handleInput($event) {
				console.log($event)
				this.$emit('input', $event)
			},
			handleSubmit(event) {
				event.preventDefault()
				this.$emit('search')
			}
		}
	}
</script>
<style lang="scss">
	.search-bar {
		.mint-search {
			height: auto;
			.mint-searchbar {
				background: #00bbe4;
				.mint-searchbar-inner {
					height: 1.3rem;
				}
				.mint-searchbar-cancel {
					font-size: 0.65rem;
					color: #fff;
				}
			}
			.mint-search-list {
				display: none;
			}
		}
	}
</style>

