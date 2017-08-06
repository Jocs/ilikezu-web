<template>
	<div class="order-result">
		<div class="icon-wrapper">
			<i class="iconfont icon-chenggong"></i>
		</div>
		<h3>租赁成功</h3>
		<p>接下来乐租商场将协调交易达成...</p>
		<div class="form-control">
			<a class="button ok" @click="jump('/home')">我知道了</a>
		</div>
		<div class="form-control">
			<a class="normal" href="javascript:;" @click="jump('/orders')">查看详情</a>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		data() {
			return {
			}
		},
		created() {
			this.$nextTick(() => {
			})
		},
		methods: {
			jump(path) {
				this.$router.push(path)
			}
		}
	}
</script>

<style lang="scss">
	.order-result {
		text-align: center;
		.icon-wrapper {
			margin-top: 5rem;
			i {
				font-size: 5rem;
				color: rgb(13, 188, 9);
			}
		}
		h3 {
			color: #333;
		}
		p {
			font-size: .65rem;
			color: #999;
		}
		.form-control {
			margin-top: .5rem;
			font-size: .75rem;
			.button.ok {
				width: 85%;
				height: 1.7rem;
				line-height: 1.7rem;
				border-radius: .2rem;
				color: #fff;
				display: inline-block;
				background: rgb(13, 188, 9);
			}
			.normal {
				line-height: 1.7rem;
				color: rgb(99, 215, 242);
			}
		}
	}
</style>