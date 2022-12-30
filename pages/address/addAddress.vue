<template>
	<view class="box-bg">
		<view class="box-bg">
			<uni-nav-bar height="40px" border fixed title="新增收货地址" ></uni-nav-bar>
		</view>
	</view>	
	<view class="example">
					<!-- 基础表单校验 -->
					<uForms ref="valiForm" :rules="rules" >
						<uFormsItem label="姓名" required name="name">
							<input placeholder="请输入姓名" />
						</uFormsItem>
						<uFormsItem label="手机号" required name="phone">
							<input  placeholder="请输入年龄" />
						</uFormsItem>
						<uFormsItem label="所在地区" name="address">
							<input type="textarea" placeholder="省/市/区/街道" />
						</uFormsItem>
						<uFormsItem label="详细地址" name="addressDetail">
							<input type="textarea" placeholder="请输入详细地址" />
						</uFormsItem>
					</uForms>
					<button type="primary" @click="submit()">提交</button>
				</view>
</template>

<script>
	import uForms from '../../uni_modules/uni-forms/components/uni-forms/uni-forms.vue'
	import uFormsItem from '../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue'
	export default {
		components:{
			uForms,
			uFormsItem
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
.box-bg{
	margin-top: 10px;
	display: flex;
	flex:2;
}
.example{
	margin-top: 10px;
	margin-left: 10px;
}
</style>