<template>
	<view>
		<view class="box-bg">
			<view class="box-bg">
				<uni-nav-bar height="40px" border fixed title="申请报销资金" />
			</view>
		</view>
	</view>
	<view class="reminbursementFunds">
			<view class="reminbursementFundsForm">
				<uForms ref="valiForm" :rules="rules" :modelValue="formData" label-width="20" >
					<uFormsItem label="订单编号"  name="orderId">
						<view style="margin-top: 10px;">{{orderId}}</view>
					</uFormsItem>
					<uFormsItem label="申报资金"  required name="money">
						<uEasyInput  v-model="formData.money" placeholder="请输入要申报的金额"></uEasyInput>
					</uFormsItem>
					<uFormsItem label="上传凭证"  required name="evidence">
						<view @tap="file()" class="upload">
							<view class="uploadContent"> 上传 </view>
						</view>
					</uFormsItem>
					<uFormsItem label="其他备注"  name="details">
						<uEasyInput type="textarea"  v-model="formData.details" placeholder="请输入内容"></uEasyInput>
					</uFormsItem>
				</uForms>
			</view>
	</view>
	<button @click="submit('valiForm')">提交</button>
</template>

<script>
	import uForms from '../../uni_modules/uni-forms/components/uni-forms/uni-forms.vue'
	import uFormsItem from '../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue'
	import uEasyInput from '../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue'
	export default {
		components:{
			uEasyInput,
			uForms,
			uFormsItem
		},
		data() {
			return {
				formData:{
					orderId:'',
					money:''
				},
				orderId:'',
				rules:{
					money:{
						rules: [
							{
								required: true,
								errorMessage: '请输入申请金额',
							},
								],
						},
						
				}
			}
		},
		onLoad(option) {
			this.orderId=option.id
		},
		methods: {
			submit(ref){
				this.$refs[ref].validate().then(res => {
				console.log(res)
					}).catch(err => {
						console.log('err', err);
				})
			},
			file(){
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data);
							}
						});
					}
				});
			}
		}
	}
</script>

<style>
.box-bg{
		margin-top: 15px;
		display: flex;
	}
	.reminbursementFunds{
		margin-top: 20px;
	}
	.upload{
		width:500rpx;
		height:200px;
		border: 1px solid #d1d1d1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	button {
		background-color: #6450ff;
		border-radius: 50rpx;
		color:white;
	}
</style>
