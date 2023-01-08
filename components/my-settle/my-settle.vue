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
		<view class="btn-settle">结算({{checkedCount}})</view>
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
		mapMutations
	} from 'vuex'
	export default {
		name: "my-settle",
		computed: {
			...mapGetters('cart', ['checkedCount', 'total', 'totalPrice']),
			// 商品是否全选
			isFullCheck() {
				// 判断商品总数是否与已勾选总数相同
				return this.total === this.checkedCount
			} ,
			
		},
		data() {
			return {

			};
		},

		methods: {
			...mapMutations('cart', ['updateAllGoodsState']),
			// 商品全选和反选
			changeAllState() {
				this.updateAllGoodsState(!this.isFullCheck)
			}
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
