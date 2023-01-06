<template>
	<view>
		<view class="goods-list">
			<view v-for="(goods, i) in goodsList" :key="i" @click="gotoDetails(goods)">
				<my-goods :goods="goods"></my-goods>
			</view>
		</view>
	</view> 
</template>

<script>
	export default {
		data() {
			return {
				// 请求携带参数
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				// 商品列表数据
				goodsList: [],
				// 商品列表总数
				total: 10,
				// 节流阀
				isLoading: false
			}
		},
		onLoad(options) {
			// 重新赋值参数
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			// 调用getGoodsList加载商品列表数据
			this.getGoodsList()
		},
		// 下拉刷新事件
		onPullDownRefresh() {
			// 重置数据
			this.queryObj.pagenum = 1
			this.total = 1
			this.isLoading = false
			this.goodsList = []
			// 获取数据
			this.getGoodsList(() => uni.stopPullDownRefresh())
		},
		// 上拉触地事件
		onReachBottom() {
			// 判断数据是否全部加载完毕
			if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) {
				return uni.$showMsg('没有更多数据了')
			}
			// 判断阀门是否打开
			if (this.isLoading) {
				return
			}
			// 页码增加,请求下一页
			this.queryObj.pagenum++
			this.getGoodsList()
		},
		methods: {
			gotoDetails(goods){
				uni.navigateTo({
					url: '/subpkg/goods_details/goods_details'
				})
			} ,
			async getGoodsList(fun) {
				// 打开节流阀
				this.isLoading = true
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				// 关闭节流阀
				this.isLoading = false
				// 判断调用停止下拉刷新
				if (fun) {fun()}
				// 请求失败
				if (res.meta.status != 200) {
					return uni.$showMsg()
				}
				uni.$showMsg('数据请求成功')
				// 请求成功后赋值goodsList , total
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
				// console.log(this.goodsList);
			}
		}

	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;

		.goods-item-left {
			margin-right: 5px;

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
</style>
