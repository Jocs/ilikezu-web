<template>
	<li 
		class="product"
		@click="goDetail(product.recordId)"
	>
		<div class="image-wrapper">
			<img :src="product.src || product.logoUri" alt="商品图片">
		</div>
		<div class="product-info">
			<div class="title">{{product.title}}</div>
			<div class="bottom">
				<div class="price">
					<span>¥<span>{{product.price | fixed}}</span></span>
				</div>
				<div class="location" v-if="product.district">
					<i class="iconfont icon-map"></i>
					<span>{{product.district}}</span>
				</div>
			</div>
		</div>
	</li>
</template>

<script>
	export default {
		props: {
			product: {
				type: Object
			}
		},
		methods: {
			goDetail(recordId) {
				this.$router.push(`/detail/${recordId}`)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.product {
		height: 5rem;
		width: 100%;
		display: flex;
		.image-wrapper {
			width: 5rem;
			height: 5rem;
			flex-shrink: 0;
			img {
				width: 4rem;
				height: 4rem;
				margin: 0.5rem;
			}
		}
		.product-info {
			padding: .4rem .5rem;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			flex: 1;
			.bottom {
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid #eee;
				padding-bottom: 0.2rem;
			}
			.title { /* 显示两行，超出部分使用省略号 */
				display: block;
				display: -webkit-box;
				-webkit-box-orient : vertical;
				padding: 0 !important;
				font-size: .7rem;
				color: #333;
				line-height: 1rem;
				height: 2rem;
				overflow: hidden;
				text-overflow: ellipsis;
				-webkit-line-clamp : 2;
			}
			.price {
				color: #dd0603;
				font-size: .8rem;
			}
			.location {
				color: #999;
				font-size: .6rem;
				i {
					font-size: .6rem;
				}
			}
		}
	}
</style>


