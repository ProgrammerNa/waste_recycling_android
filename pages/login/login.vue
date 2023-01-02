<template>
	<view class="login-title" >
		<text class="title"  style="font-size: 20px;">登录</text>
	</view>
		<view class="input-item" style="margin-top: 20rpx;">
			<view class="title-content">
				<text class="title">账号</text>
				</view>
			<input class="input" placeholder="手机号/邮箱" style="margin-left: 40rpx;" v-model="userName" />
		</view>
		  <view class="input-item">
			<view class="title-content">
				<text class="title">密码</text>
			</view>
			<input class="input" :password="showPassword" placeholder="请输入密码" style="margin-left: 40rpx;" v-model="password" />
		</view>
		<view class="button" @click="login">登录</view>
</template>

<script>
	import {userlogin } from '../../api/loginApi.js'
	import store from '../../store/index.js'
	import {storeToRefs} from 'pinia'
	export default {
		data() {
			return {
				userName:'',
				password:'',
				showPassword:true,
				piniaStore:store(),
				resData:''
			}
		},
		onLoad() {

		},
		methods: {
			showPwd(){
				this.showPassword = !this.showPassword
			},
			login(){
				console.log("登录")
				uni.switchTab({
					url:'/pages/home/home',
				})
				userlogin({
					'username':this.userName,
					'password':this.password
				}).then((res) => {
					console.log(res)
					// this.resData=res
					
					if(res.data.code === 200){
						// plus.storage.setItemAsync('userInfo',res.data.data)
						uni.showToast({
								title: "登录成功",
								icon:"success",
								duration: 2000,
								});
							uni.switchTab({
								url:'/pages/home/home',
							})
					}
				})
				
			}

		}
	}
</script>

<style>
	.login-title{
		margin-top: 25%;
	}
	.title{
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-left: 20px;
	}
    .input-item {
        display: flex;
        margin-left: 32rpx;
        margin-right: 32rpx;
        height: 50px;
        align-items: center;
        border-bottom: 1px solid #efeff4;
        margin-bottom: 20rpx;

        .title-content {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .title {
                font-size: 18px;
            }
        }

        .input {
            flex: 1;
        }
    }

    .button {
        height: 50px;
        line-height: 50px;
        margin-top: 60rpx;
        margin-left: 32rpx;
        margin-right: 32rpx;
        border-radius: 50rpx;
        font-size: 20px;
        background-color: #008AFE;
        color: #FFFFFF;
        text-align: center;
    }
</style>

