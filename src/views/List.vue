<template>
	<div class="list">
		<div 
			class="scroll-container"
			v-infinite-scroll="loadMore"
  			infinite-scroll-disabled="seLoading.status"
			infinite-scroll-distance="10"
		>
			<search-bar
				:value="searchKey"
				@input="handleInput($event)"
				@search="search(0, 10)"
			></search-bar>
			<ul class="product-list">
					<product
						v-for="(product, index) of seProducts"
						:key="index"
						:product="product"
					></product>
			</ul>
			<div v-if="seLoading.status" class="loading">
				<div v-if="seLoading.hasMore" class="more">
					<mt-spinner type="fading-circle"></mt-spinner>&nbsp;拼命加载中...
				</div>
				<div v-if="!seLoading.hasMore" class="nomore">
					<i class="iconfont icon-sorry"></i>&nbsp;没有更多内容...
				</div>
			</div>
		</div>
		<bar-bottom></bar-bottom>		
	</div>
</template>
<script>
	import BarBottom from '../components/barBottom.vue'
	import SearchBar from '../components/searchBar.vue'
	import Product from '../components/product.vue'

	import { mapState } from 'vuex'

	export default {
		components: {
			'bar-bottom': BarBottom,
			'search-bar': SearchBar,
			'product': Product
		},
		data() {
			return {
				searchKey: '',
				proTypeId: ''
			}
		},
		computed: {
			...mapState(['seProducts', 'seLoading'])
		},
		created() {
			this.$nextTick(() => {
				const {searchKey, proTypeId} = this.$route.params
				console.log(searchKey)
				if (searchKey && searchKey !== 'null') this.searchKey = searchKey
				if (proTypeId) this.proTypeId = proTypeId
				this.search(0, 10) // 初始搜索0到10条商品
			})
		},
		methods: {
			search(from, maxNum) {
				const params = {from, maxNum}
				if (this.searchKey) params.searchKey = this.searchKey
				if (this.proTypeId) params.proTypeId = this.proTypeId
				this.$store.dispatch('GET_SE_PRODUCTS', params)
			},
			loadMore() {
				const from = this.seProducts.length
				this.search(from, 10)
			},
			handleInput($event) {
				console.log($event)
				this.searchKey = $event
			}
		}
	}
</script>

<style lang="scss">
	.list {
		.scroll-container {
			height: calc(100vh - 2.5rem);
			margin-bottom: 2.5rem;
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