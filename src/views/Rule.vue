<template>
	<div class="rule">
		<bar-top
			:text="title"
		></bar-top>
		<div class="scroll-wrapper">
			<div class="image-wrapper">
				<img src="http://pic.ilikezu.cn/026bd0e0-cdf6-4e7b-bc52-5140eee42bf0.jpg" alt="">
			</div>
			<ul>
				<li v-for="(rule, index) of content" :key="index">
					<h4>{{rule.header}}</h4>
					<p v-for="(t, i) of rule.text" :key="i">{{t}}</p>
				</li>
			</ul>
			<div class="image-wrapper">
				<img src="http://pic.ilikezu.cn/e8e24689-8166-4c68-9aab-3ee946e8e03f.jpg" alt="">
			</div>
		</div>
	</div>
</template>

<script>
	import BarTop from '../components/barTop.vue'
	import { mapState } from 'vuex'

	export default {
		data() {
			return {
				title: '租赁规则',
				content: [{
					header: '1.关于会员注册与登陆:',
					text: ['亲爱的乐租会员，为了保证您账号和资金安全，乐租生活平台会在每次租赁和登陆时向您发送手机短信验证，如有不便，敬请谅解！', '您也可以通过微信登陆，但还是请您在个人信息中补充齐姓名、手机号和详细地址信息，便于我们给您提供周到详细服务！']
				}, {
					header: '2.产品租赁：',
					text: ['我们出租的任何产品都是经过官方认证并亲自发布的，请各位乐租会员放心租赁，如有任何问题可以随时联系官方客服微信：ilikezu888或拨打免费400电话：4000086026']
				}, {
					header: '3.租赁流程',
					text: ['通过搜索或直接选中某商品，选择在线支付，根据产品类型不同，需要支付产品相应的押金、租金、以及部分大件物品收取一定物流费用！']
				}, {
					header: '4.发货时间',
					text: ['我们收到订单信息，会有官方指定客服联系您，与您确认发货事宜！除爆款产品或新产品需采购外，一般我们会在1-3内配送完成，具体发货时间由客服与您沟通！']
				}, {
					header: '5.关于物流和回收',
					text: ['目前平台商品除了官方配送、合作快递还支持客户自取等方式，根据距离远近需要支付一定物流费用，嘉定区支持免费送货上门。', '产品租赁完成前会有官方客服与您联系产品续租或回收事宜。']
				}, {
					header: '6.关于产品押金和退款',
					text: ['产品下单后，我们会通过线上支付方式收取一定的押金，一般为产品购买价格的1/5或更低，您租赁完成产品后，我们收到货物确认没有问题，会在1个工作日内退款，退款会在1-3个工作日原路返回，请您随时关注微信退款提示！']
				}, {
					header: '7.关于物品损坏赔偿',
					text: ['根据不同产品，我们会不断完善各零部件维修信息，非人为损坏我们联系厂家确认维修费用，与您确认后从押金扣除，请您放心，多数产品一般我们官方承担维修费用！']
				}]
			}
		},
		components: {
			'bar-top': BarTop
		},
		computed: {
		},
		created() {
			this.$nextTick(() => {
			})
		},
		methods: {
		}
	}
	// http://pic.ilikezu.cn/026bd0e0-cdf6-4e7b-bc52-5140eee42bf0.jpg
	// http://pic.ilikezu.cn/e8e24689-8166-4c68-9aab-3ee946e8e03f.jpg
</script>

<style lang="scss">
	.rule {
		.scroll-wrapper {
			height: calc(100vh - 2.2rem);
			margin-top: 2.2rem;
			box-sizing: border-box;
			overflow: auto;
			-webkit-overflow-scrolling: touch;
			ul li {
				width: 100%;
				padding: 0 .5rem;
				box-sizing: border-box;
				color: #333;
				p {
					font-size: .75rem;
				}
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