<template>
	<div class="about">
		<bar-top
			:text="title"
		></bar-top>
		<div class="scroll-wrapper">
			<h3>爱乐租，I LIKE ZU！</h3>
			<p class="sub-title">"绿色生活，有偿共享"</p>
			<p class="sub-title second">—— 中国首家闲置和应急租赁平台</p>
			<p class="content">无物不租，无事不租，任何闲置物品均可在爱乐租平台提供租赁，任何日常、应急租赁商品均可在爱乐租获得帮助，绿色生活，有偿共享，爱乐租旨在为大家提供一种健康的、绿色的生活方式！</p>
			<p class="content">除了物品出租与租赁，还可以提供生活服务租赁，不论是保洁、车接车送、舞台搭建、APP开发、陪吃陪玩均可以在爱乐租发布需求，总有不好开口的帮助，爱乐租帮您解决尴尬，有偿共享是我们的态度！</p>
			<div class="image-wrapper">
				<img src="http://pic.ilikezu.cn/e8e24689-8166-4c68-9aab-3ee946e8e03f.jpg" alt="">
			</div>
		</div>
	</div>
</template>

<script>
	import BarTop from '../components/barTop.vue'

	export default {
		data() {
			return {
				title: '关于我们',
				content: []
			}
		},
		components: {
			'bar-top': BarTop
		},
		computed: {
		},
		created() {
			this.$nextTick(() => {
				// this.getAddress()
			})
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.about {
		.scroll-wrapper {
			height: calc(100vh - 2.2rem);
			margin-top: 2.2rem;
			box-sizing: border-box;
			overflow: auto;
			-webkit-overflow-scrolling: touch;
			padding: 0 .5rem;
			color: #333;
			.sub-title {
				color: rgb(61, 167, 66);
				font-size: bolder;
				font-size: .85rem;
			}
			.second {
				padding-left: 2rem;
			}
			.content {
				font-size: .75rem;
			}
			.image-wrapper {
				width: 100%;
				overflow: hidden;
				img {
					width: 100%;
				}
			}
		}
	}
</style>