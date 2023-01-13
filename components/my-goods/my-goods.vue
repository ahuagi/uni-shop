<template>
	<view @click="goodsClick">
		<view class="goods-item" >
			<!-- 商品左侧图片区域 -->
			<view class="goods-item-left">
				<!-- 勾选框 -->
				<radio :checked = "goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClick"></radio>
				<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
			</view>
			<!-- 商品右侧信息区域 -->
			<view class="goods-item-right">
				<!-- 商品标题 -->
				<view class="goods-name">{{goods.goods_name}}</view>
				<view class="goods-info-box" >
					<!-- 商品价格 -->
					<view class="goods-price">￥{{goods.goods_price}}</view>
					<!-- 商品数量 -->
					<!-- 阻止事件冒泡 -->
					<view class="" @click.stop="">
						<uni-number-box :min="1" :value="goods.goods_count" v-if="showRadio" @change="numChange"></uni-number-box>
					</view>
				</view>
			</view>
		</view>
	</view> 
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			// 商品信息
			goods :{
				type : Object ,
				default : {}
			} ,
			// 是否展示radio
			showRadio:{
				type : Boolean,
				default : false
			}
		} ,
		data() {
			return {
				// 默认图片路径
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		} ,
		methods:{
			// 勾选框点击
			radioClick(){
				// 触发自定义事件
				this.$emit('radio-change' , {
					goods_id : this.goods.goods_id ,
					goods_state : !this.goods.goods_state
				})
			} ,
			// 商品数量改变
			numChange(val){
				// 触发自定义事件
				this.$emit('num-change' , {
					goods_id : this.goods.goods_id ,
					goods_count : +val
				})
			} ,
			// 点击商品
			goodsClick(){
				// 触发自定义事件
				this.$emit('myclick' , {
					goods_id : this.goods.goods_id
				})
			}
		}
	}
</script>

<style lang="scss">
.goods-item {
    // 让 goods-item 项占满整个屏幕的宽度
    width: 750rpx;
    // 设置盒模型为 border-box
    box-sizing: border-box;
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

  .goods-item-left {
    margin-right: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    	
    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }

  .goods-item-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
    }

    .goods-price {
      font-size: 16px;
      color: #c00000;
    }
  }
}
// unmberbox
.goods-item-right {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;

  .goods-name {
    font-size: 13px;
  }

  .goods-info-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .goods-price {
    font-size: 16px;
    color: #c00000;
  }
}
</style>