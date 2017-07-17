<template>
	<nav class="bar-bottom">
		<router-link to="/home" class="tab-item">
			<i class="iconfont icon-home1"></i>
			<span class="tab-label">主页</span>
		</router-link>
		<router-link to="/list" class="tab-item">
			<i class="iconfont icon-viewlist"></i>
			<span class="tab-label">分类</span>
		</router-link>
		<router-link :to="path" class="tab-item">
			<i class="iconfont icon-account"></i>
			<span class="tab-label">我的</span>
		</router-link>
	</nav>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		computed: {
			...mapState(['isLogin']),
			path() {
				return this.isLogin ? '/personal' : '/login'
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.bar-bottom {
		background: #fff;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 2.5rem;
		left: 0;
		right: 0;
		box-shadow: 0 1px 2px #999;
		display: flex;
	}
	.tab-item {
		flex: 1;
		text-align: center;
		display: flex;
		flex-direction: column;
		color: #999;
		font-size: 0.55rem;
		padding-top: 0.22rem;
		i {
			font-size: 1.1rem;
		}
	}
	.router-link-active.tab-item {
		color: #00bbe4;
	}
</style>