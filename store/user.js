// 用户信息
export default {
	namespaced: true,

	state: () => ({
		// 读取本地数据，初始化 address 对象
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		// 用户登录状态
		token: uni.getStorageSync('token') || '',
		// 用户信息
		userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}') ,
		// 重定向信息
		redirectInfo : null
	}),

	mutations: {
		// 更新收货信息
		updateAddress(state, address) {
			state.address = address
			this.commit('user/saveAddressToStorage')
		},
		// 存储收货信息到本地
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		// 更新用户信息
		updateUserInfo(state, userInfo) {
			state.userInfo = userInfo
			this.commit('user/saveUserInfoToStorage')
		},
		// 存储用户信息到本地
		saveUserInfoToStorage(state) {
			uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
		},
		// 更新 token 字符串
		updateToken(state, token) {
			state.token = token
			this.commit('user/saveTokenToStorage')
		},

		// 存储token到本地
		saveTokenToStorage(state) {
			uni.setStorageSync('token', state.token)
		} ,
		// 更新 redirectInfo 信息
		updateRedirectInfo(state, info) {
			state.redirectInfo = info 
		},
	},
	getters: {
		// 收货详细地址
		addstr(state) {
			// 判断是否为空
			if (!state.address.provinceName) return ''
			// 拼接 省，市，区，详细地址
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address
				.detailInfo
		}
	}
}
