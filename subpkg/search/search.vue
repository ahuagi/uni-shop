<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-box">
			<uni-search-bar @input="input" :radius="100" cancelButton="none" v-model="kw"></uni-search-bar>
		</view>

		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchResults.length != 0">
			<view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>

		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<!-- 标题区域 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clean"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list">
				<uni-tag :text="item" v-for="(item, i) in historyList" :key="i" @click="gotoSearch(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 延时器
				timer: null,
				// 搜索关键词
				kw: '',
				// 搜索结果列表
				searchResults: [],
				// 搜索历史记录
				historyList: []
			};
		},
		// 页面加载
		onLoad(){
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		} ,
		methods: {
			
			// 搜索框输入事件
			input(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					// 重新赋值搜索关键词
					this.kw = e
					// 判断关键词是否为空
					if (this.kw === '') {
						// 清空搜索结果
						this.searchResults = []
						return
					}
					this.getSearchResults()
					this.saveHistoryList()
				}, 500)
			},
			// 搜索建议查询
			async getSearchResults() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/qsearch', { 
					query: this.kw
				})
				// 请求失败
				if (res.meta.status != 200) {
					return uni.$showMsg()
				}
				// 请求成功后赋值searchResults
				this.searchResults = res.message
				console.log(this.searchResults);
			},

			// 搜索建议结果跳转
			gotoDetail(id) {
				uni.navigateTo({
					url: '/subpkg/goods_details/goods_details?goods_id=' + id
				})
			},
			// 保存搜索关键词
			saveHistoryList() {
				// 定义set集合处理重复的关键词
				const set = new Set(this.historyList)
				set.delete(this.kw)
				this.historyList = Array.from(set)
				this.historyList = [this.kw , ...this.historyList]
				// 持久化存储
				uni.setStorageSync('kw' , JSON.stringify(this.historyList))
			} ,
			// 清空历史记录
			clean(){
				this.historyList = [] ,
				uni.setStorageSync('kw' , '[]')
			} ,
			// 点击搜索历史
			gotoSearch(item){
				this.kw = item
				this.getSearchResults()
			}
		}
	}
</script>

<style lang="scss">
	// 搜索框
	.uni-searchbar {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		position: relative;
		padding: 16rpx;
		/* 将默认的 #FFFFFF 改为 #C00000 */
		background-color: #c00000;
	}

	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	// 搜索建议
	.sugg-list {
		padding: 0 5px;

		.sugg-item {
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.goods-name {
				// 文字不允许换行（单行文本）
				white-space: nowrap;
				// 溢出部分隐藏
				overflow: hidden;
				// 文本溢出后，使用 ... 代替
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}

	// 搜索历史
	.history-box {
		padding: 0 5px;

		.history-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40px;
			font-size: 13px;
			border-bottom: 1px solid #efefef;
		}

		.history-list {
			display: flex;
			flex-wrap: wrap;

			.uni-tag {
				border: 1px solid #efefef;
				background-color: #efefef;
				color: darkgray;
				margin-top: 5px;
				margin-right: 5px;
			}
		}
	}
</style>
