
<template>
	<div class="product-content">
		<div v-html="content"></div>
	</div>
</template>

<script>

	import Progressive from './progressive.js'

	export default {
		props: {
			content: {
				type: String
			}
		},
		watch: {
			content(val) {
				if (val) {
					this.$nextTick(() => {
						new Progressive({
							el: '.product-content',
							lazyClass: 'lazy',
							removePreview: false,
							scale: true
						}).fire()
					})
				}
			}
		},
		created() {
		}
	}
</script>

<style lang="scss">
	.product-content {
		background: #fff;
		br {
			display: none;
		}
		/* 渐进式图片所需css  */
		.progressive {
			position: relative;
			display: block;
			overflow: hidden;
			img {
					display: block;
					width: 100%;
					max-width: 100%;
					height: 100%;
					border: 0 none;
				&.preview {
					filter: blur(2vw);
					transform: scale(1.05);
				}
				&.hide {
					opacity: 0;
				}
				&.origin {
					position: absolute;
					top: 0;
					left: 0;
					bottom: 0;
					right: 0;
					animation: origin 1.5s ease-out;
				}
				&.origin-scale {
					position: absolute;
					top: 0;
					left: 0;
					bottom: 0;
					right: 0;
					animation: origin-scale 1s ease-out;
				}
			}
		}

		@keyframes origin {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
		@keyframes origin-scale {
			0% {
				opacity: 0;
				transform: scale(1.05);
			}
			100% {
				opacity: 1;
				transform: scale(1);
			}
		}
	}
</style>