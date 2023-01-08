import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from './cart.js'
import moduleUser from './user.js'
Vue.use(Vuex)
// 实例化
const store = new Vuex.Store({
	modules : {
		'cart' : moduleCart ,
		'user' : moduleUser
	}
})

export default store