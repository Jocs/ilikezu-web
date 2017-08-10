<template>
	<li class="fan-item">
		<div class="head-wrapper">
			<img :src="fan.headPic" alt="头像">
		</div>
		<div class="info">
			<div class="personal">
				<div class="name">{{fan.nickName}}</div>
				<div class="mobile">{{fan.mobile}}</div>
			</div>
			<div class="time">注册时间：<span>{{fan.createTime.split(' ')[0]}}</span></div>
		</div>
	</li>
</template>
<script>
	export default {
		props: {
			fan: {
				type: Object,
				required: true
			}
		},
		methods: {
		}
	}
</script>
<style lang="scss" scoped>
	.fan-item {
		display: flex;
		align-items: center;
		font-size: .65rem;
		padding: 0 1rem 0 .5rem;
		.head-wrapper {
			width: 2rem;
			height: 2rem;
			border-radius: 50%;
			overflow: hidden;
			margin: 0 .5rem 0 0;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.info {
			display: flex;
			flex-direction: column;
			border-bottom: 1px solid #eee;
			flex: 1;
			padding: .5rem 0;
			.personal {
				display: flex;
				margin-bottom: .2rem;
				font-size: .75rem;
				color: #333;
				justify-content: space-between;
				.mobile {color: #999;}
			}
			.time {
				color: #bbb;
			}
		}
	}
</style>