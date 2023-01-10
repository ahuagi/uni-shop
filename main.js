// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from './store/store'
// 网络请求的配置
import {
	$http
} from '@escook/request-miniprogram'
uni.$http = $http

// 定义展示数据请求状态的方法
uni.$showMsg = function(title = "数据请求失败", duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}

// 基础请求地址
$http.baseUrl = 'https://api-hmugo-web.itheima.net'
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '数据加载中'
	})

	// 判断请求的是否为有权限的 API 接口
	if (options.url.indexOf('/my/') !== -1) {
		// 为请求头添加身份认证字段
		options.header = {
			// 字段的值可以直接从 vuex 中进行获取
			Authorization: store.state.user.token,
		}
	}
}

$http.afterRequest = function() {
	uni.hideLoading()
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
