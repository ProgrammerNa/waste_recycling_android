<template>
	<view class="box-bg">
		<view class="box-bg">
			<uni-nav-bar height="40px" border fixed title="个人信息" />
		</view>
	</view>
	<view class="header">
		<view class="header_avatar">
			<view class="header_avatar_box">
				<image src="../../static/images/avatar.jpg" mode="aspectFill"></image>
			</view>
		</view>
		</view>
		<view class="formData">
			<uForms ref="valiForm" :rules="rules" >
				<uFormsItem label="用户名">
					<view style="margin-top: 10px;" >{{userName}}</view>
				</uFormsItem>
				<uFormsItem label="昵&nbsp;&nbsp;&nbsp;称" >
					<view class="input-style">
					<uEasyInput v-model="nickName" placeholder="请输入昵称" />
					</view>
				</uFormsItem>
				<uFormsItem label="性别" >
					<view class="input-style">
					<uDataCheckBox v-model="sex1" :localdata="sexs" />
					</view>
				</uFormsItem>
			</uForms>
		</view>
		<view class="btn">
			<button class="save-btn" @click="saveUserInfomation">保存</button>
		</view>
</template>

<script>
	import uForms from '../../uni_modules/uni-forms/components/uni-forms/uni-forms.vue'
	import uFormsItem from '../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue'
	import uEasyInput from '../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue'
	import uDataSelect from '../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.vue'
	import uDataCheckBox from '../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.vue'
	import store from '../../store/index.js'
	import { updateUserInformation } from '../../api/userApi.js'
	import request from '../../utils/http.js'
	export default {
		components:{
			uForms,
			uFormsItem,
			uDataSelect,
			uEasyInput,
			uDataCheckBox
		},
		data() {
			return {
				sexs: 
				[
					{
						text: '保密',
						value: 0,
					},
					{
						text: '男',
						value: 1,
					},
					{
						text: '女',
						value: 2,
					},
				],
				userInfo:uni.getStorageSync('userInfo'),
				userName:'',
				nickName:'',
				sex1:0
			}
		},
		mounted() {
			this.userName = this.userInfo.data.name;
			this.nickName = this.userInfo.data.nickName;
			this.sex1 = this.userInfo.data.sex;
			console.log( "userInfo",this.userInfo)
		},
		methods: {
			saveUserInfomation(){
				const user = {
					'name':this.userName,
					'nickName':this.nickName,
					'sex':this.sex1,
					'avatar':this.userInfo.data.avatar,
					'password':this.userInfo.data.password,
					'email':this.userInfo.data.email,
					'mobile':this.userInfo.data.mobile,
					'status':this.userInfo.data.status,
					'role':this.userInfo.data.role
				}
				this.userInfo.data = user
				updateUserInformation(user).then((res) => {
					if(res.data.code === 200) {
						uni.showToast({
								title: "修改成功",
								icon:"success",
								duration: 2000,
					});
					uni.setStorageSync('userInfo',this.userInfo)	
					}else{
						console.log('no')
					}
					console.log("sasas")
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style>
.header_avatar{
	display: flex;
	justify-content: center;
	padding-top: 30px;
	}
	.header_avatar .header_avatar_box{
		width: 100px;
		height: 100px;
		border-radius: 50%;
		overflow: hidden;
	}
	.header_avatar .header_avatar_box image{
		width: 100%;
		height: 100%;
	}
	.formData{
		margin-top: 30px;
		margin-left: 10px;
	}
	.save-btn{
		background-color: #6450ff;
		border-radius: 50rpx;
		color:white;
		
	}
	.input-style{
		width: 250px;
		
	}
	.box-bg{
		margin-top: 15px;
		display: flex;
	}
	
</style>
