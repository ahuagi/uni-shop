<template>
	<view>
		<!-- 顶部搜索组件 -->
		<my-search @myclick = 'gotoSearch'></my-search>

		<view class="scroll-view-container">
			<!-- 左侧的滚动视图区域 -->
			<scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
				<block v-for="(item , index) in cateList" :key="index">
					<view :class="['left-scroll-view-item' , index == active ? 'active' : '']"
						@click="changeActive(index)">{{item.cat_name}}</view>
				</block>
			</scroll-view>
			<!-- 右侧的滚动视图区域 -->
			<scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2, i2) in cateList2" :key="i2">
					<view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
					<!-- 动态渲染三级分类的列表数据 -->
					<view class="cate-lv3-list">
						<!-- 三级分类 Item 项 -->
						<view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3"
							@click="gotoGoodsList(item3)">
							<!-- 图片 -->
							<image :src="item3.cat_icon"></image>
							<!-- 文本 -->
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import badge from '@/mixins/tabbar-badge.js'
	export default {
		mixins : [badge] ,
		data() {
			return {
				// 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度
				wh: 0,
				// 左侧分类数据列表
				cateList: [],
				// 右侧分类数据列表
				cateList2: [],
				// 滚动条距离顶部的距离
				scrollTop: 0,
				// 分类激活
				active: 0
			};
		},

		methods: {
			// 获取分类数据
			async getCateList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				// 请求失败
				if (res.meta.status != 200) {
					return uni.$showMsg()
				}
				// 请求成功后赋值cateList,cateList2
				this.cateList = res.message
				this.cateList2 = res.message[0].children
				console.log(this.cateList2);
			},
			// 左侧分类点击事件触发
			changeActive(index) {
				this.active = index
				// 重新赋值cateList2
				this.cateList2 = this.cateList[index].children
				// scrollTop动态赋值
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
				// console.log(this.cateList2);
			},
			// 点击三级分类项跳转到商品列表页面
			gotoGoodsList(item3) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id
				})
			} ,
			// 搜索按钮
			gotoSearch(){
				// console.log('ok');
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			// 可用高度 = 屏幕高度 - navigationBar高度 - tabBar高度 - 自定义的search组件高度
			this.wh = sysInfo.windowHeight - 50
			this.getCateList()
		}
	}
</script>

<style lang="scss">
	// 左侧滚动条样式
	.scroll-view-container {
		display: flex;

		.left-scroll-view {
			width: 120px;

			.left-scroll-view-item {
				line-height: 60px;
				background-color: #f7f7f7;
				text-align: center;
				font-size: 12px;

				// 激活项的样式
				&.active {
					background-color: #ffffff;
					position: relative;

					// 渲染激活项左侧的红色指示边线
					&::before {
						content: ' ';
						display: block;
						width: 3px;
						height: 30px;
						background-color: #c00000;
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}
		}
	}

	// 右侧滚动条样式
	.cate-lv2-title {
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;
	}

	.cate-lv3-list {
		display: flex;
		flex-wrap: wrap;

		.cate-lv3-item {
			width: 33.33%;
			margin-bottom: 10px;
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				width: 60px;
				height: 60px;
			}

			text {
				font-size: 12px;
			}
		}
	}
</style>
