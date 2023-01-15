<template>
	<view class="box-bg">
		<view class="box-bg">
			<uNavBar height="40px" border fixed title="注册" />
		</view>
	</view>	
	<view class="register">
		<uForms ref="valiForm" :rules="rules" label-width="20" >
			<uFormsItem label="输入账户"  required name="username">
				<view class="input-style">
				<uni-easyinput  placeholder="请输入账户(用户)名"  v-model="username"> </uni-easyinput>
				</view>
			</uFormsItem>
			<uFormsItem label="输入密码"  required name="password">
				<view class="input-style">
				<uni-easyinput placeholder="请输入密码" type="password"  v-model="password"></uni-easyinput>
				</view>
			</uFormsItem>
			<uFormsItem label="重复密码"  required name="resetPassword">
				<view class="input-style">
				<uni-easyinput placeholder="请再次输入密码" type="password"  v-model="resetPassword"></uni-easyinput>
				</view>
			</uFormsItem>
			<uFormsItem label="选择角色" required>
				<view class="input-style">
				<uDataCheckBox v-model="role" :localdata="roles" />
				</view>
			</uFormsItem>
		</uForms>
	</view>
	<button @click="submit">提交</button>
</template>

<script>
	import uNavBar from '../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
	import uForms from '../../uni_modules/uni-forms/components/uni-forms/uni-forms.vue'
	import uFormsItem from '../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue'
	import uEasyInput from '../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue'
	import uDataCheckBox from '../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.vue'
	export default {
		components:{
			uNavBar,
			uForms,
			uFormsItem,
			uEasyInput,
			uDataCheckBox
		},
		data() {
			return {
				username:'',
				password:'',
				resetPassword:'',
				role:0,
				roles:
				[
					{
						text: '普通用户',
						value: 0,
					},
					{
						text: '回收员',
						value: 1,
					},
				],
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.box-bg{
	margin-top: 15px;
	display: flex;
}
.register{
	margin-top: 20px;
	margin-left: 10rpx;
}
button {
		background-color: #43c7ff;
		color: white;
		border-radius: 30px;
	}
	.input-style{
		width: 250px;
		
	}
	
</style>
