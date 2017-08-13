<template>
	<div class="home">
		<div 
			class="scroll-container"
			v-infinite-scroll="loadMore"
  			infinite-scroll-disabled="reLoading.status"
			infinite-scroll-distance="10"
		>
			<search-bar
				:value="value"
				@input="handleInput($event)"
				@search="handleSearch()"
			></search-bar>
			<div class="lz-swipper">
				<mt-swipe :auto="4000">
					<mt-swipe-item
						v-for="(b, index) of banner"
						:key="index"
					>
						<img :src="b.imgUrl" alt="" @click="jump(b.productId)">
					</mt-swipe-item>
				</mt-swipe>
			</div>
			<div class="cards">
				<mt-swipe :auto="20000">
					<mt-swipe-item
						v-for="(card, i) of cards"
						:key="i"
					>
						<ul>
							<li v-for="(c, ii) of card"
								:key="ii"
								@click="handleCardClick(c.proTypeId)"
							>
								<div class="img-wrapper">
									<img :src="c.src" alt="">
								</div>
								<div class="text">{{c.text}}</div>
							</li>
						</ul>
					</mt-swipe-item>
				</mt-swipe>
			</div>
			<ul class="product-list">
					<product
						v-for="(product, index) of reProducts"
						:key="index"
						:product="product"
					></product>
			</ul>
			<div v-if="reLoading.status" class="loading">
				<div v-if="reLoading.hasMore" class="more">
					<mt-spinner type="fading-circle"></mt-spinner>&nbsp;拼命加载中...
				</div>
				<div v-if="!reLoading.hasMore" class="nomore">
					<i class="iconfont icon-sorry"></i>&nbsp;没有更多内容...
				</div>
			</div>
		</div>
		<bar-bottom></bar-bottom>		
	</div>
</template>
<script>
	import { mapState } from 'vuex'

	import BarBottom from '../components/barBottom.vue'
	import SearchBar from '../components/searchBar.vue'
	import Product from '../components/product.vue'
	export default {
		components: {
			'bar-bottom': BarBottom,
			'search-bar': SearchBar,
			'product': Product
		},
		data() {
			return {
				value: ''
			}
		},
		computed: {
			...mapState(['banner', 'cards', 'reProducts', 'reLoading'])
		},
		created() {
			this.$nextTick(() => {
				this.getBanner()
				this.getCards()
				this.getReProducts(0, 10)
				console.log('create')
			})
		},
		methods: {
			jump(id) {
				this.$router.push(`/detail/${id}`)
			},
			handleInput(event) {
				this.value = event
			},
			handleSearch() {
				this.$router.push(`/list/${this.value}`)
			},
			handleCardClick(proTypeId) {
				this.$router.push(`/list/null/${proTypeId}`)
			},
			getBanner() {
				this.$store.dispatch('GET_BANNER', {from: 0, maxNum: 5})
			},
			getCards() {
				this.$store.dispatch('GET_CARDS')
			},
			getReProducts(from, maxNum) {
				this.$store.dispatch('GET_RE_PRODUCTS', {from, maxNum})
			},
			loadMore() {
				this.getReProducts(this.reProducts.length, 10)
			}
		}
	}
</script>

<style lang="scss">
	.home {
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
		.lz-swipper {
			width: 100%;
			height: 8.6rem;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.cards {
			height: 5rem;
			margin-top: 0.5rem;
			ul {
				display: flex;
			}
			li {
				list-style: none;
				display: flex;
				width: 25%;
				height: 100%;
				flex-direction: column;
				
				.img-wrapper {
					margin: 0 auto;
					width: 3rem;
					height: 3rem;
					border-radius: 50%;
					background: #ff9f2f;
					overflow: hidden;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.text {
					margin-top: 0.3rem;
					font-size: 0.7rem;
					text-align: center;
					color: #333;
				}
			}
		}
	}
</style>