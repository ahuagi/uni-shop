<template>
	<view class="login-container">
		<!-- 提示登录的图标 -->
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<!-- 登录按钮 -->
		<button type="primary" class="btn-login" @click="getUserInfo">一键登录</button>
		<!-- 登录提示 -->
		<view class="tips-text">登录后尽享更多权益</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		name: "my-login",
		computed: {
			...mapState('user', ['token', 'userInfo', 'redirectInfo'])
		},
		data() {
			return {

			};
		},
		methods: {
			...mapMutations('user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
			// 获取微信用户的基本信息
			async getUserInfo() {
				const [err, res] = await uni.getUserProfile({
					desc: '用于会员登录'
				}).catch(err => err)
				if (err?.errMsg === 'getUserProfile:fail auth deny') return uni.$showMsg('您取消了登录授权！')
				this.updateUserInfo(res.userInfo)
				// 获取登录成功后的 Token 字符串
				this.getToken(res)
			},

			// 调用登录接口，换取永久的 token
			async getToken(info) {
				const token =
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
				// 2. 更新 vuex 中的 token
				this.updateToken(token)
				uni.$showMsg('登录成功')
				this.navigateBack()
			},
			// 返回登录前页面
			navigateBack() {
				// 若redirectInfo不为null导航方式为 switchTab
				if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {  
					// 页面导航
					uni.switchTab({
						url: this.redirectInfo.from,
						// 导航成功后redirectInfo 对象重置为 null
						complete: () => {
							uni.$showMsg('登录成功,返回购物车') 
							this.updateRedirectInfo(null)
						}  
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.login-container {
		// 登录盒子的样式
		height: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #f8f8f8;
		position: relative;
		overflow: hidden;

		// 绘制登录盒子底部的半椭圆造型
		&::after {
			content: ' ';
			display: block;
			position: absolute;
			width: 100%;
			height: 40px;
			left: 0;
			bottom: 0;
			background-color: white;
			border-radius: 100%;
			transform: translateY(50%);
		}
   
		// 登录按钮的样式
		.btn-login {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #c00000;
		}

		// 按钮下方提示消息的样式
		.tips-text {
			font-size: 12px;
			color: gray;
		}
	}
</style>
