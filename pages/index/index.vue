<template>
		<view>
			<view class="header">
				<view class="header_avatar">
					<view class="header_avatar_box">
						<image src="../../static/images/avatar.jpg" mode="aspectFill"></image>
					</view>
				</view>
				<view class="nickName">
					<text>{{userInfo.data.name}}</text>
				</view>
			</view>
			<view class="orders">
			<view class="title">我的订单</view>
			<view class="sorts">
					<view style="margin-top: -10rpx;margin-left: 100rpx;" @tap="gotoFeeds(0)">
						<image src="../../static/images/orderWating.png" style="width: 30px;height: 30px;"></image>
					</view>
					<view style="margin-top: 60rpx;margin-left: -60rpx;margin-bottom: -20rpx;">
						<text class="icon-waiting" >待接单</text>
					</view>
					<view style="margin-top: -15rpx;margin-left: 150rpx;" @tap="gotoFeeds(1)">
						<image src="../../static/images/orderFinish.png" style="width: 40px;height: 40px;"></image>
					</view>
					<view style="margin-top: 60rpx;margin-left: -60rpx;margin-bottom: -20rpx;">
						<text class="icon-finished" v-if="userInfo.data.role[0].name === '普通用户'">已完成</text>
						<text class="icon-finished" v-if="userInfo.data.role[0].name === '回收员'">已接单</text>
					</view>
					<view style="margin-top: -15rpx;margin-left: 150rpx;" @tap="gotoFeeds(2)" v-if="userInfo.data.role[0].name === '普通用户'">
						<image src="../../static/images/order.png"  style="width: 30px;height: 33px;"></image>
					</view>
					<view style="margin-top: 60rpx;margin-left: -60rpx;margin-bottom: -20rpx;" v-if="userInfo.data.role[0].name === '普通用户'">
						<text class="icon-list" >全部订单</text>
					</view>
					<view style="margin-top: -15rpx;margin-left: 150rpx;" @tap="gotoFeeds(2)"  v-if="userInfo.data.role[0].name === '回收员'">
						<image src="../../static/images/order.png"  style="width: 30px;height: 33px;"></image>
					</view>
					<view style="margin-top: 60rpx;margin-left: -60rpx;margin-bottom: -20rpx;"  v-if="userInfo.data.role[0].name === '回收员'">
						<text class="icon-list" >已完成</text>
					</view>
			</view>
		</view>
		</view>
		<view class="extra">
			<view class="item icon-arrow"></view>
			<view @click="address" class="item icon-arrow" v-if="userInfo.data.role[0].name === '普通用户'">收货地址</view>
			<view @click="information" class="item icon-arrow">个人信息</view>
			<view @click="checkPassword" class="item icon-arrow">修改密码</view>
			<view @click="reimbursementFunds" class="item icon-arrow" v-if="userInfo.data.role[0].name === '回收员'">报销查询</view>
			<!-- 打开意见反馈界面，用户提交反馈内容上传到日志 -->
			<button open-type="feedback" class="item icon-arrow">意见反馈</button>
			<view @click="tuichu" class="item icon-arrow">退出登录</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:uni.getStorageSync('userInfo'),
				orderType:'待接单',
			}
		},
		methods: {
			gotoFeeds(e){
				console.log(e)
				 uni.navigateTo({
				            url:'/pages/order/order?current='+e
				
				        })
			},
			address(){
				uni.navigateTo({
					url:'/pages/address/address'
				})
			},
			information(){
				uni.navigateTo({
					url:'/pages/userInformation/userInformation'
				})
			},
			checkPassword(){
				uni.navigateTo({
					url:'/pages/userInformation/checkPassword'
				})
			},
			tuichu(){
				console.log('aaa')
				uni.reLaunch({
					url:'/pages/login/login'
				})
				uni.removeStorageSync('userInfo')
			},
			reimbursementFunds(){
				uni.navigateTo({
					url:'/pages/reimbursementFunds/checkReimbursementFund/checkReimbursementFund'
				})
			}
			

		}
	}
</script>

<style>
	.header{
		display: flex;
		flex: 2;
	}
	.header_avatar{
		padding-left: 10px;
		padding-top: 30px;
	}
	.header_avatar .header_avatar_box{
		width: 60px;
		height: 60px;
		border-radius: 50%;
		overflow: hidden;
	}
	.header_avatar .header_avatar_box image{
		width: 100%;
		height: 100%;
	}
	.nickName{
		padding-left: 10px;
		padding-top: 50px;
	}
	
	.orders {
		margin: 60rpx 20rpx 0 20rpx;
		padding: 40rpx 0;
		border-radius: 4rpx;
		}
	 .title {
		 padding-left: 20rpx;
		 font-size: 30rpx;
		 color: #333;
		 padding-bottom: 20rpx;
		 border-bottom: 1rpx solid #eee;
		 margin-top: -30rpx;
		 }
	.sorts {
		padding-top: 50rpx;
		text-align: center;
		display: flex;
		}
			[class*="icon-"] {
					flex: 1;
					font-size: 24rpx;
		
					&::before {
						display: block;
						font-size: 48rpx;
						margin-bottom: 8rpx;
						color: #ea4451;
					}
				}
		
	.extra {
			margin: 0 20rpx;
			background-color: #fff;
			border-radius: 4rpx;}
	
			.extra .item {
				line-height: 1;
				padding: 25rpx 0 25rpx 20rpx;
				border-bottom: 1rpx solid #eee;
				font-size: 30rpx;
				color: #333;
			}
	
			.extra button {
				text-align: left;
				background-color: #fff;
			}
			button::after {
				border: none;
			}
		
			
		
			.icon-arrow {
				position: relative;
		
				&::before {
					position: absolute;
					top: 50%;
					right: 20rpx;
					transform: translateY(-50%);
				}
			}
	
</style>
