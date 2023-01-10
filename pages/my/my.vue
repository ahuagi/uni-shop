<template>
	<view class="my-container">
		<!-- 登录组件 -->
		<my-login v-if="!token"></my-login>
		<!-- 用户信息组件 --> 
		<my-userinfo v-else></my-userinfo> 
   	</view> 
</template>

<script>
	import { mapState } from 'vuex'
	import badge from '@/mixins/tabbar-badge.js'
		
	export default {
		computed:{
			...mapState('user' , ['token'])
		} ,
		mixins : [badge] ,
		data() {
			return {
				
			};
		}
	}
</script> 
 
<style lang="scss"> 
page , .my-container {
  height: 100%;
}
</style> 
   