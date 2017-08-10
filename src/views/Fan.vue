<template>
	<div class="fan">
		<bar-top
			:text="title"
		></bar-top>
		<div 
			class="scroll-container"
			v-infinite-scroll="loadMore"
  			infinite-scroll-disabled="faLoading.status"
			infinite-scroll-distance="10"
		>
			<ul>
				<fan-item 
					:fan="fan"
					v-for="(fan, index) of fans"
					:key="index"
				></fan-item>
			</ul>
			<div v-if="faLoading.status" class="loading">
				<div v-if="faLoading.hasMore" class="more">
					<mt-spinner type="fading-circle"></mt-spinner>&nbsp;拼命加载中...
				</div>
				<div v-if="!faLoading.hasMore" class="nomore">
					<i class="iconfont icon-sorry"></i>&nbsp;没有更多内容...
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BarTop from '../components/barTop.vue'
	import FanItem from '../components/fanItem.vue'
	import { mapState } from 'vuex'

	export default {
		data() {
			return {
				title: '我的推荐好友'
			}
		},
		components: {
			'bar-top': BarTop,
			'fan-item': FanItem
		},
		computed: {
			...mapState(['fans', 'faLoading'])
		},
		created() {
			this.$nextTick(() => {
				this.getFans({from: 0, max: 10})
			})
		},
		methods: {
			getFans(params) {
				this.$store.dispatch('GET_FANS', params)
			},
			loadMore() {
				this.$store.dispatch('GET_FANS', {from: this.fans.length, max: 10})
			}
		}
	}
</script>

<style lang="scss">
	.fan {
		.scroll-container {
			height: calc(100vh - 2.2rem);
			margin-top: 2.2rem;
			overflow: auto;
			-webkit-overflow-scrolling: touch;
			padding-top: .5rem;
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