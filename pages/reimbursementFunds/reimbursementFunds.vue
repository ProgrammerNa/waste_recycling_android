<template>
	<view>
		<view class="box-bg">
			<view class="box-bg">
				<uni-nav-bar height="40px" border fixed title="申请报销资金" left-icon="left" @clickLeft="backPage" />
			</view>
		</view>
	</view>
	<view  :class="{'showBack':showWarn}">
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
						<view @tap="chooseImages()" class="upload" v-if="show">
							<view class="uploadContent"> 上传 </view>
						</view>
						<view class="image-box" v-for="(item,index) of formData.evidence" v-if="formData.evidence !== []">
							<image :src="item"></image>
						</view>
						</uFormsItem>
					<uFormsItem label="其他备注"  name="details">
						<uEasyInput type="textarea"  v-model="formData.details" placeholder="请输入内容"></uEasyInput>
					</uFormsItem>
				</uForms>
			</view>
	</view>
	<button @click="submit('valiForm')">提交</button>
	<view :class="{'mask':showWarn}"></view>
	</view>
	<view class="poupBox" v-if="showWarn">
		<view class="poup">
			<view class="title">请注意,申请后不能进行修改!点击确认即可申请成功</view>
			<view class="optionBtn">
				<view class="cancelText" @click="cancelBtn1">取消</view>
				<view class="confirmText" @click="confirmBtn1">确认</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {submitApplication} from '../../api/applicationApi.js'
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
					money:'',
					evidence:[],
					details:''
				},
				showWarn:false,
				userInfo:uni.getStorageSync('userInfo'),
				orderId:'',
				show:true,
				index:'',  //标记申请是哪个订单
				rules:{
					money:{
						rules: [
							{
								required: true,
								errorMessage: '请输入申请金额',
							},
								],
						},
						evidence:{
							rules: [
								{
									required: true,
									errorMessage: '请上传图片凭证',
								},
									],
							},
						
				}
			}
		},
		onLoad(option) {
			this.orderId=option.id
			this.index = option.index
			console.log(this.orderId)
		},
		methods: {
			cancelBtn1(){
				this.showWarn=false
			},
			confirmBtn1(){
				submitApplication({
					'orderId':this.orderId,
					'expenses':this.formData.money,
					'evidence':this.formData.details,
					'recyclerId':this.userInfo.data.id
				}).then((res) => {
					if(res.data.code === 200){
						this.showWarn=false
						setTimeout(() => {
						
						uni.redirectTo({
							url:'/pages/order/order?current=2'
						})
						},500)
					}
				})
			},
			submit(ref){
				this.$refs[ref].validate().then(res => {
					this.showWarn=true
					}).catch(err => {
						console.log('err', err);
				})
			},
			backPage(){
				uni.redirectTo({
					url:'/pages/order/order?current=2'
				})
			},
			 chooseImages() {
					uni.chooseImage({
						success: (chooseImageRes) => {
							this.show=false
							const tempFilePaths = chooseImageRes.tempFilePaths;
							console.log(tempFilePaths)
							tempFilePaths.forEach((val) => {
								this.formData.evidence.push(val)
								uni.uploadFile({
									url: 'http://192.168.193.72:8090/application/uploadImage',
									filePath: val,
									name: 'files',
									formData: {
										orderId: this.orderId
									},
									success: (uploadFileRes) => {
										console.log("adfasf")
										console.log(uploadFileRes);
											},
									
								});
							})
							console.log(this.ImageUrl)
						}
					});
				},
			
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
	.showBack{
		width: 100%;
		height: 100%;
		position: relative;
		
	}
	.mask{
		 width: 100%;
		 height: 100%;
		 background: rgba(0, 0, 0, 0.3);
		 position: absolute;
		 top: 0;
		 left: 0;
	}
	.poupBox{
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
	.poup{
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		width:400px;
		height:300px;
		background-color: #ffffff;
		border: 1px solid lightgrey;
		border-radius: 10px;
		box-shadow:10px 10px 10px #c6c6c6;
	}
	.content{
		margin-left: 10px;
		margin-right: 10px;
	}
	.optionBtn{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.cancelText{
		width: 50%;
		text-align: center;
		border: 1px solid #c6c6c6;
		margin-left: 10px;
		margin-right: 10px;
	}
	.confirmText{
		width: 50%;
		text-align: center;
		border: 1px solid #c6c6c6;
		margin-left: 10px;
		margin-right: 10px;
	}
	.title{
		font-size: 20px;
		text-align: center;
		width: 100%;
		margin-top:20px;
		margin-bottom:10px;
	}
</style>
