<template>
	<div class="collection">
		<bar-top
			:text="title"
		></bar-top>
		<div 
			class="scroll-container"
			v-infinite-scroll="loadMore"
  			infinite-scroll-disabled="coLoading.status"
			infinite-scroll-distance="10"
		>
			<ul class="product-list">
				<product
					v-for="(product, index) of collection"
					:key="index"
					:product="product"
				></product>
			</ul>
			<div v-if="coLoading.status" class="loading">
				<div v-if="coLoading.hasMore" class="more">
					<mt-spinner type="fading-circle"></mt-spinner>&nbsp;拼命加载中...
				</div>
				<div v-if="!coLoading.hasMore" class="nomore">
					<i class="iconfont icon-sorry"></i>&nbsp;没有更多内容...
				</div>
			</div>
		</div>
		<bar-bottom></bar-bottom>
	</div>
</template>

<script>
	import BarTop from '../components/barTop.vue'
	import BarBottom from '../components/barBottom.vue'
	import Product from '../components/Product.vue'
	import { mapState } from 'vuex'

	export default {
		data() {
			return {
				title: '我的收藏'
			}
		},
		components: {
			'bar-top': BarTop,
			'bar-bottom': BarBottom,
			'product': Product
		},
		computed: {
			...mapState(['collection', 'coLoading'])
		},
		created() {
			this.$nextTick(() => {
				this.getCollection({from: 0, max: 6})
			})
		},
		methods: {
			getCollection(params) {
				this.$store.dispatch('GET_COLLECTION', params)
			},
			loadMore() {
				this.$store.dispatch('GET_COLLECTION', {from: this.collection.length, max: 6})
			}
		}
	}
</script>

<style lang="scss">
	.collection {
		.scroll-container {
			height: calc(100vh - 4.7rem);
			margin-bottom: 2.5rem;
			margin-top: 2.2rem;
			overflow: auto;
			-webkit-overflow-scrolling: touch;
			.loading {
				height: 2rem;
				text-align: center;
    			font-size: .6rem;
    			padding-top: .6rem;
    			.nomore {
    				color: #999;
    			}
    			.more {
    				color: #999;
    				font-size: .6rem;
					span {
						display: inline-block;
						vertical-align: middle;
					}
    			}
			}
		}
	}
</style>