<template>
	<view class="my-settle-container" v-if="total != 0">
		<!-- 全选区域 -->
		<label class="radio" @click="changeAllState">
			<radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
		</label>

		<!-- 合计区域 -->
		<view class="amount-box">
			合计:<text class="amount">￥{{totalPrice}}</text>
		</view>

		<!-- 结算按钮 -->
		<view class="btn-settle" @click="settle">结算({{checkedCount}})</view>
	</view>

	<!-- 购物车无商品时显示 -->
	<view class="empty-cart" v-else>
		<image src="/static/cart_empty@2x.png" class="empty-img"></image>
		<text class="tip-text">空空如也~</text>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		name: "my-settle",
		computed: {
			...mapGetters('cart', ['checkedCount', 'total', 'totalPrice']),
			...mapState('cart' , ['cart']) ,
			...mapGetters('user', ['addstr']),
			...mapState('user', ['token']),
			// 商品是否全选
			isFullCheck() {
				// 判断商品总数是否与已勾选总数相同
				return this.total === this.checkedCount
			},

		},
		data() {
			return {
				// 倒计时总时长
				seconds: 3,
				// 定时器的 Id
				timer: null
			};
		},

		methods: {
			...mapMutations('cart', ['updateAllGoodsState', ]),
			...mapMutations('user', ['updateRedirectInfo']),
			// 商品全选和反选
			changeAllState() {
				this.updateAllGoodsState(!this.isFullCheck)
			},
			// 点击结算按钮
			settle() {
				// 判断选中商品是否为空
				if (!this.checkedCount) {
					return uni.$showMsg('请选择要结算的商品')
				}
				// 判断收货地址是否为空
				if (!this.addstr) {
					return uni.$showMsg('请添加收货地址')
				}
				// 判断token是否为空 
				if (!this.token) {
					return this.delayNavigate()
				}
				 
			},
			// 展示倒计时提示消息
			showTips(n) {
				// 展示提示消息
				uni.showToast({
					icon: 'none',
					// 提示消息
					title: '请登录后再结算 ' + n + ' 秒后自动跳转到登录页',
					// 防止点击穿透
					mask: true,
					// 1秒后自动消失
					duration: 1000
				})
			},
			// 延迟导航到 我的 页面
			delayNavigate() {
				// 时间重置成 3 秒
				this.seconds = 3
				this.showTips(this.seconds)
				// 定时器每隔一秒展示一次提示信息，时间截至时跳转到我的页面
				this.timer = setInterval(() => {
					this.seconds--
					if (this.seconds <= 0) {
						clearInterval(this.timer)
						uni.switchTab({
							url: '/pages/my/my',
							// 页面跳转成功
							success: () => {
								// 修改重定向信息
								this.updateRedirectInfo({
									// 跳转方式
									openType: 'switchTab',
									// 从哪个页面跳转过去的
									from: '/pages/cart/cart'
								})
							}
						})
						return
					}
					this.showTips(this.seconds)

				}, 1000)
			},

		}


	}
</script>

<style lang="scss">
	// 外层容器
	.my-settle-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		// 将背景色从 cyan 改为 white
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 5px;
		font-size: 14px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount {
			color: #c00000;
		}

		.btn-settle {
			height: 50px;
			min-width: 100px;
			background-color: #c00000;
			color: white;
			line-height: 50px;
			text-align: center;
			padding: 0 10px;
		}
	}

	// 购物车为空
	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;

		.empty-img {
			width: 90px;
			height: 90px;
		}

		.tip-text {
			font-size: 12px;
			color: gray;
			margin-top: 15px;
		}
	}
</style>
