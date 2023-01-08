<!-- 收货地址组件 -->
<template>
	<view>
		<!-- 选择收货地址 -->
		<view class="address-choose-box" v-if="JSON.stringify(address) == '{}'">
			<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
		</view>
		<!-- 收货信息盒子 -->
		<view class="address-info-box" v-else @click="chooseAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="username">收货人：<text>{{address.userName}}</text></view>
				</view>
				<view class="row1-right">
					<view class="phone">电话：<text>{{address.telNumber}}</text></view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收货地址：</view>
				<view class="row2-right">{{addstr}}</view>
			</view>
		</view>

		<!-- 底部边框线 -->
		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		name: "my-address",
		computed: {
			// 获取vuex中的address
			...mapState('user', ['address']),
			...mapGetters('user', ['addstr']),
		},
		data() {
			return {

			};
		},
		methods: {
			// 获取修改address的方法
			...mapMutations('user', ['updateAddress']),
			// 地址授权
			async reAuth() {
				// 弹出提示框
				const [err2, confirmResult] = await uni.showModal({
					content: '检测到您没打开地址权限，是否去设置打开？',
					confirmText: "确认",
					cancelText: "取消",
				})
				if (err2) return
				// 点击取消
				if (confirmResult.cancel) return uni.$showMsg('取消了地址授权')
				// 点击确认
				if (confirmResult.confirm) return uni.openSetting({
					success: (settingResult) => {
						// 地址授权的值等于 true
						if (settingResult.authSetting['scope.address']) return uni.$showMsg(
							'授权成功！请选择地址')
						// 地址授权的值等于 false
						if (!settingResult.authSetting['scope.address']) return uni.$showMsg(
							'您取消了地址授权！')
					}
				})
			},
			// 选择收货地址
			async chooseAddress() {
				const [err, succ] = await uni.chooseAddress().catch(err => err)
				// 判断是否请求成功
				if (err === null && succ.errMsg === 'chooseAddress:ok') {
					// 为 data 里面的收货地址对象赋值
					this.updateAddress(succ)
					console.log(this.address);
				}

				// 判断用户是否授权
				 if (err && (err.errMsg === 'chooseAddress:fail auth deny' || err.errMsg === 'chooseAddress:fail authorize no response')) {
				    this.reAuth()
				  }
			}
		}
	}
</script>

<style lang="scss">
	// 底部边框线的样式
	.address-border {
		display: block;
		width: 100%;
		height: 5px;
	}

	// 选择收货地址的盒子
	.address-choose-box {
		height: 90px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	// 收货信息的盒子
	.address-info-box {
		font-size: 12px;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 5px;

		// 第一行
		.row1 {
			display: flex;
			justify-content: space-between;

			.row1-right {
				display: flex;
				align-items: center;

				.phone {
					margin-right: 5px;
				}
			}
		}

		// 第二行
		.row2 {
			display: flex;
			align-items: center;
			margin-top: 10px;

			.row2-left {
				white-space: nowrap;
			}
		}
	}
</style>
