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
				<uFormsItem label="用户名" required name="name">
					<input placeholder="请输入用户名" />
				</uFormsItem>
				<uFormsItem label="昵称" required name="nickName">
					<input  placeholder="请输入昵称" />
				</uFormsItem>
				<uFormsItem label="性别" required name="sex">
					 <uDataSelect
					      v-model="value"
					      :localdata="range"
					      @change="change"
						  style="width: 200px;"
					    ></uDataSelect>
				</uFormsItem>
			</uForms>
		</view>
</template>

<script>
	import uForms from '../../uni_modules/uni-forms/components/uni-forms/uni-forms.vue'
	import uFormsItem from '../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue'
	import uDataSelect from '../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.vue'
	export default {
		components:{
			uForms,
			uFormsItem,
			uDataSelect
		},
		data() {
			return {
				value: 0,
				      range: [
				        { value: 0, text: "男" },
				        { value: 1, text: "女" },
				        { value: 2, text: "保密" },
				      ],
			}
		},
		methods: {
			
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
	}
</style>
