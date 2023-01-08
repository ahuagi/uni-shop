<template>
	<view class="cart">
		<!-- 收货地址区域 -->
		<my-address></my-address>
		<!-- 购物车商品列表的标题区域 -->
		<view class="cart-title">
			<!-- 左侧的图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 描述文本 -->
			<text class="cart-title-text">购物车</text>
		</view>

		<!-- 渲染商品信息 -->
		<uni-swipe-action>
		  <block v-for="(goods, i) in cart" :key="i">
		    <uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)">
		      <my-goods :goods="goods" :show-radio="true" :show-num="true" @radio-change="radioChange" @num-change="numberChange" @myclick = "gotoDetail"></my-goods>
		    </uni-swipe-action-item>
		  </block>
		</uni-swipe-action>
		<!-- 结算组件 -->
		<my-settle></my-settle>
	</view>
</template>

<script>
	import badge from '@/mixins/tabbar-badge.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		mixins: [badge],
		computed: {
			...mapState('cart', ['cart'])
		},
		data() {
			return {
				options: [{
				      text: '删除', // 显示的文本内容
				      style: {
				        backgroundColor: '#C00000' // 按钮的背景颜色
				      }
				    }]
			};
		},
		methods: {
			...mapMutations('cart', ['updateGoodsState', 'updateGoodsCount' , 'removeGoodsById']),
			// 点击勾选框
			radioChange(e) {
				this.updateGoodsState(e)
			},
			// 商品数量改变
			numberChange(e) {
				// console.log(e);
				this.updateGoodsCount(e)
			} ,
			// 点击滑动操作按钮
			swipeActionClickHandler(goods) {
				console.log(goods)
				this.removeGoodsById(goods.goods_id) 
			} ,
			// 点击跳转到商品详情页
			gotoDetail(goods){
				uni.navigateTo({
					url: '/subpkg/goods_details/goods_details?goods_id=' + goods.goods_id
				})
			}
		}

	}
</script>

<style lang="scss">
	// 标题区域
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			margin-left: 10px;
		}
	} 
	// 优化底部结算组件
	.cart{
	  padding-bottom: 50px;
	}
</style>
