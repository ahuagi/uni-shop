// 购物车模块
export default {
	namespaced: true,
	state: () => ({
		// 购物车商品信息初始化
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	mutations: {
		// 修改购物车商品信息
		addCart(state, goods) {
			const findResult = state.cart.find(i => i.goods_id == goods.goods_id)
			if (!findResult) {
				state.cart.push(goods)
			} else {
				findResult.goods_count++
			}
			// console.log(state.cart);
			this.commit('cart/saveToStorage')
		},
		// 本地存储数据
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		// 更新商品勾选状态
		updateGoodsState(state, goods) {
			const findResult = state.cart.find(i => i.goods_id == goods.goods_id)
			if (findResult) {
				findResult.goods_state = goods.goods_state
				this.commit('cart/saveToStorage')
			}
		},
		// 更新商品数量
		updateGoodsCount(state, goods) {
			const findResult = state.cart.find(i => i.goods_id == goods.goods_id)
			if (findResult) {
				findResult.goods_count = goods.goods_count
				this.commit('cart/saveToStorage')
			}
		},
		// 删除商品信息
		removeGoodsById(state, goods_id) {
			state.cart = state.cart.filter(i => i.goods_id != goods_id)
			console.log(state.cart);
			this.commit('cart/saveToStorage')
		},
		// 更新所有商品的勾选状态
		updateAllGoodsState(state, newState) {
			// 更新购物车中每件商品的勾选状态
			state.cart.forEach(x => x.goods_state = newState)
			// console.log(state.cart); 
			// 持久化存储到本地 
			this.commit('cart/saveToStorage')
		}

	},
	getters: {
		// 统计购物车中商品的总数量
		total(state) {
			return state.cart.reduce((total, item) => total += item.goods_count, 0)
		},
		// 统计购物车已勾选商品总数量
		checkedCount(state) {
			// 先使用 filter 方法，从购物车中过滤器已勾选的商品
			// 再使用 reduce 方法，将已勾选的商品总数量进行累加
			// reduce() 的返回值就是已勾选的商品的总数量
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
		} ,
		// 统计购物车已勾选商品总价格
		totalPrice(state){
			// 先使用 filter 方法，从购物车中过滤器已勾选的商品
			// 再使用 reduce 方法，将已勾选的商品价格进行累加
			// toFixed保留两位小数
			// reduce() 的返回值就是已勾选的商品的总价格
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_price, 0).toFixed(2)
		}
	}
}
