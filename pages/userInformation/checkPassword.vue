<template>
	<view class="box-bg">
		<view class="box-bg">
			<uni-nav-bar height="40px" border fixed title="修改密码" />
		</view>
	</view>
		<view class="formData">
			<uForms ref="valiForm" :rules="rules" :modelValue="formData" label-width="20" >
				<uFormsItem label="输入密码"  required name="password">
					<view class="input-style">
					<uEasyInput type="password" v-model="formData.password" placeholder="请输入密码"></uEasyInput>
					</view>
				</uFormsItem>
				<uFormsItem label="重复密码"  required name="resetPassword">
					<view class="input-style">
					<uEasyInput type="password"  placeholder="请再次输入密码" v-model="formData.resetPassword" />
					</view>
				</uFormsItem>
			</uForms>
		</view>
		<button @click="submit('valiForm')">提交</button>
</template>

<script>
	import uForms from '../../uni_modules/uni-forms/components/uni-forms/uni-forms.vue'
	import uFormsItem from '../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue'
	import uEasyInput from '../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue'
	import store from '../../store/index.js'
	import {checkPassword} from'../../api/userApi.js'
	export default {
		components:{
			uForms,
			uFormsItem,
			uEasyInput
		},
		data() {
			var validateFunction = (rule, value, data, callback) => {
				if(value !== this.formData.password){ 
				        callback("俩次密码输入不一致");  
				        return false; 
				    }
					return true
				};
			return {
				formData:{
					password:'',
					resetPassword:'',
				},
				userInfo:uni.getStorageSync('userInfo'),
				rules:{
					password:{
						rules: [
							{
								required: true,
								errorMessage: '请输入密码',
							},
								],
						},
						resetPassword:{
								rules: [
									{
										required: true,
										errorMessage: '请重复输入密码',
									},
									{validateFunction }
										],
							},
						
					
				}
			}
		},
		methods: {
			submit(ref){
				this.$refs[ref].validate().then(res => {
					checkPassword({
						'username':this.userInfo.data.name,
						'password':this.formData.password,
						'repassword':this.formData.resetPassword
						
					}).then((res) => {
						console.log(res)
						if(res.data.code === 200) {
							uni.showToast({
										title: "修改成功",
										icon:"success",
										duration: 2000,
							});
							uni.navigateTo({
								url:'/pages/login/login'
							})
						}
					})
					}).catch(err => {
						console.log('err', err);
				})
			}
			
		}
	}
</script>

<style>
	.box-bg{
		margin-top: 15px;
		display: flex;
	}
	.formData{
		margin-top: 30px;
		margin-left: 10px;
	}
	button {
		background-color: #6450ff;
		border-radius: 50rpx;
		color:white;
	}
	.input-style{
		width: 250px;
		
	}
	
</style>
