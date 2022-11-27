<template>
		<view>
			<text>登录页面简化版</text>
		</view>
		<view>
			<button @click="login">请点击进行登录</button>
		</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {

		},
		methods: {
			login(){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}

		}
	}
</script>

<style>
	
</style>
