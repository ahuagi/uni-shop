// 用户信息
export default {
	namespaced: true,

	state: () => ({
		// 读取本地数据，初始化 address 对象
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
	}),

	mutations: {
		// 更新收货信息
		updateAddress(state, address) {
			state.address = address
			this.commit('user/saveAddressToStorage')
		},
		// 存储到本地
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
	},
	getters: {
		// 收货详细地址
		addstr(state) {
			// 判断是否为空
			if (!state.address.provinceName) return ''
			// 拼接 省，市，区，详细地址
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
}
