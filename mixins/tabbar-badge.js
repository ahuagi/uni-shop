// 设置购物车徽标

import { mapGetters } from 'vuex'
export default{
	computed:{
		...mapGetters('cart' , ['total'])
	} ,
	// 页面展示时设置购物车徽标
	onShow() {
		this.setBadge()
	} ,
	methods:{
		// 设置购物车徽标
		setBadge(){
			uni.setTabBarBadge({
				index : 2 ,
				text : this.total + ''
			})
		}
	} ,
	watch: {
	   // 监听total的变化，重新设置徽标
	   total: {
	      handler() {
				this.setBadge()
	      },
	   }
	}
}