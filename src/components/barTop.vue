<template>
	<div class="bar-top">
		<i 
			class="iconfont icon-back"
			@click="back"
		></i>
		<span>{{text}}</span>
	</div>
</template>
<script>
	export default {
		props: {
			text: {
				type: String,
				required: true
			},
			path: {
				type: String
			}
		},
		methods: {
			back() {
				if (this.path) {
					this.$router.push(this.path)
				} else {
					this.$router.back()
				}
			}
		}
	}
</script>
<style lang="scss">
	.bar-top {
		height: 2.2rem;
		font-size: 0.85rem;
		text-align: center;
		line-height: 2.2rem;
		width: 100%;
		position: fixed;
		top: 0;
    	background: #00bbe4;
    	color: #fff;
    	z-index: 100;
    	i {
    		position: absolute;
    		left: .3rem;
    		color: #fff;
    		font-size: 1.4rem;
    	}
	}
</style>