<template>
	<view class="box-bg">
		<view class="box-bg">
			<uni-nav-bar height="40px" border fixed title="修改密码" />
		</view>
	</view>
		<view class="formData">
			<uForms ref="valiForm" :rules="rules" >
				<uFormsItem label="密码" required name="password">
					<input placeholder="请输入密码" />
				</uFormsItem>
				<uFormsItem label="重复密码" required name="repairPassword">
					<input  placeholder="请再次输入密码" />
				</uFormsItem>
			</uForms>
		</view>
		<button>提交</button>
</template>

<script>
	import uForms from '../../uni_modules/uni-forms/components/uni-forms/uni-forms.vue'
	import uFormsItem from '../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue'
	export default {
		components:{
			uForms,
			uFormsItem,
		},
		data() {
			return {
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.formData{
		margin-top: 30px;
		margin: left 10px;
	}
	button {
		background-color: #43c7ff;
		color: white;
		border-radius: 30px;
	}
</style>
