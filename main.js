
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

// 网络请求的配置
import { $http } from '@escook/request-miniprogram'
uni.$http = $http

// 定义展示数据请求状态的方法
uni.$showMsg = function(title = "数据请求失败" , duration = 1500){
	uni.showToast({
		title , 
		duration ,
		icon:'none'
	})
}

// 基础请求地址
$http.baseUrl = 'https://www.uinav.com'
$http.beforeRequest = function(options){
	uni.showLoading({
		title : '数据加载中'
	})
}

$http.afterRequest = function(){
	uni.hideLoading()
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif