<template>
	<view class="login-title" >
		<image src="../../static/images/back.png" style="width: 20px; height: 20px;float: left;"></image>
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
	export default {
		data() {
			return {
				userName:'',
				password:'',
				showPassword:true,
			}
		},
		onLoad() {

		},
		methods: {
			showPwd(){
				this.showPassword = !this.showPassword
			},
			login(){
				uni.request({
					url:"http://localhost:8090/login",
					method:"POST",
					data:{
						userName:this.userName,
						password:this.password,
					},
					success: (res) => {
						console.log(res)
					}
				})
				// if(this.userName === 'admin' && this.password === '123456'){
				// 	uni.showToast({
				// 		title: "登录成功",
				// 		icon:"success",
				// 		duration: 2000,
				// 		});
				// 	uni.switchTab({
				// 		url:'/pages/home/home'
				// 	})
				// }else {
				// 	uni.showToast({
				// 		title: "登录失败",
				// 		icon:"error",
				// 		duration: 2000,
				// 		});
				// }
				
			}

		}
	}
</script>

<style>
	.login-title{
		margin-top: 10px;
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

