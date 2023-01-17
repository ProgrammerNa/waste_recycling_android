<template>
	<view class="box-bg">
		<view class="box-bg">
			<uni-nav-bar height="40px" border fixed title="回收详情" />
		</view>
	</view>
	<view class="form">
			<uForms ref="valiForm" :modelValue="formData" :rules="rules" label-width="20" >
				<uFormsItem label="回收类型"  required name="recyleType">
					<view class="input-style">
					<uEasyInput  v-model="formData.recyleData" disabled="true"></uEasyInput>
					</view>
				</uFormsItem>
				<uFormsItem label="回收单价"  required name="recylePrice">
					<view class="input-style">
					<uEasyInput  v-model="formData.recylePrice" disabled="true" />
					</view>
				</uFormsItem>
				<uFormsItem label="预估重量"  required name="weight">
					<view class="input-style">
					<uEasyInput  v-model="formData.weight"  />
					</view>
				</uFormsItem>
				<uFormsItem label="回收地址"  required name="recyleAddress">
					<view class="input-style">
					<uEasyInput  v-model="formData.recyleAddress"  />
					</view>
				</uFormsItem>
				<uFormsItem label="上门时间"  required name="time">
					<view class="input-style">
					<uEasyInput  v-model="formData.time"  />
					</view>
				</uFormsItem>
				<uFormsItem label="预得金额"  required name="money">
					<view class="input-style">
					<uEasyInput  v-model="formData.money" disabled="true"   />
					</view>
				</uFormsItem>
			</uForms>
			</view>
		<button @click="submit">提交</button>
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
			return {
				formData:{
					recyleType:'',
					recylePrice:'',
					weight:'',
					recyleAddress:'',
					time:'',
					money:''
					
				}
			}
		},
		methods: {
			submit(){
			}
			
		}
	}
</script>

<style>
	.box-bg{
		margin-top: 15px;
		display: flex;
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
