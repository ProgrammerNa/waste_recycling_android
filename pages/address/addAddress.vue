<template>
	<view class="box-bg">
		<view class="box-bg">
			<uni-nav-bar height="40px" border fixed title="新增收货地址" left-icon="left" @clickLeft="backPage" ></uni-nav-bar>
		</view>
	</view>	
	<view class="example">
					<!-- 基础表单校验 -->
					<uForms ref="valiForm" :modelValue="formData" :rules="rules" label-width="20" >
						<uFormsItem label="姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名" required name="name">
							<view class="input-style">
								<uEasyInput placeholder="请输入姓名" v-model="formData.name" />
							</view>
						</uFormsItem>
						<uFormsItem label="手机号码" required name="phone">
							<view class="input-style">
								<uEasyInput  placeholder="请输入手机号" v-model="formData.phone" />
							</view>
						</uFormsItem>
						<uFormsItem label="所在地区" required name="address">
							<picker mode="multiSelector" :range="cityArray" @columnchange='selectAddress' @cancel="cancelSelect">
								<view class="input-style">
									<uEasyInput  placeholder="请选择省/市/区/街道 " v-model="formData.address"  />
								</view>
							</picker>
						</uFormsItem>
						<uFormsItem label="详细地址" required name="addressDetail">
							<view class="input-style">
									<uEasyInput  type="textarea" autoHeight  placeholder="请输入详细地址" v-model="formData.addressDetail"  />
							</view>
						</uFormsItem>
					</uForms>
					<button type="primary" @click="submit('valiForm')">提交</button>
				</view>
</template>

<script>
	import uForms from '../../uni_modules/uni-forms/components/uni-forms/uni-forms.vue'
	import uFormsItem from '../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue'
	import uEasyInput from '../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue'
	import {getAddressAreaList, addAddress} from'../../api/areaApi.js'
	export default {
		components:{
			uForms,
			uFormsItem,
			uEasyInput
		},
		data() {
			return {
				userInfo:uni.getStorageSync('userInfo'),
				formData: {
								name:'',
								phone:'',
								addressDetail:'',
								address:'',
							},
				province:[],
				city:[],
				area:[],
				area1:[],
				street:[],
				street1:[],
				cityArray:[],
				cityAddressIndex:[0,0,0,0],
				rules:{
					name:{
						rules: [
							{
								required: true,
								errorMessage: '请输入姓名',
							},
								],
						},
						phone:{
							rules: [
								{
									required: true,
									errorMessage: '请输入手机号',
								},
								{
									validateFunction: function(rule, value, data, callback) {
										if(!(/^1[0123456789]\d{9}$/.test(value))){ 
										        callback("手机号码有误，请重填");  
										        return false; 
										    } 
											return true
										}
								}
									],
						},
						address:{
							rules: [
								{
									required: true,
									errorMessage: '请选择地址',
								},
									],
						},
						addressDetail:{
							rules: [
								{
									required: true,
									errorMessage: '请输入详细地址',
								},
									],
						}
				}
			}
		},
		onShow() {
			getAddressAreaList().then(res => {
					if(res.data.code === 200) {
						this.province.push(res.data.data[0].name)
						this.city.push(res.data.data[0].children[0].name)
						res.data.data[0].children[0].children.forEach((val) => {
							this.area.push({
								name:val.name,
								children:val.children
							})
							this.area1.push(val.name)
							val.children.forEach((val1) => {
								this.street.push(val1.name)
							})
						})
					}
				})
				console.log('ssssssss')
				this.cityArray[0] = this.province
				this.cityArray[1] = this.city
				this.cityArray[2] = this.area1
				this.cityArray[3] = this.street
				console.log(this.area)
				console.log('sss',this.cityArray)
		},
		methods: {
			backPage(){
				uni.redirectTo({
					url:'/pages/address/address'
				})
			},
			submit(ref){
				this.$refs[ref].validate().then(res => {
					addAddress({
						'name':this.formData.name,
						'phone':this.formData.phone,
						'areaName':this.formData.address,
						'fullAddress':this.formData.addressDetail,
						'userId':this.userInfo.data.id,
					}).then((res) => {
						if(res.data.code === 200){
							uni.redirectTo({
								url:'/pages/address/address'
							})
							uni.showToast({
									title: "新增成功",
									icon:"success",
									duration: 2000,
									});
						}else{
							uni.showToast({
									title: "网络异常",
									icon:"success",
									duration: 2000,
									});
						}
					}).catch(err => {
						uni.showToast({
								title: "网络异常",
								icon:"success",
								duration: 2000,
								});
					})
					}).catch(err => {
						console.log('err', err);
						})
			},
			cancelSelect(){
				this.address=''
			},
			 selectAddress: function(e) {
				 console.log(e)
				 this.cityAddressIndex[e.detail.column] = e.detail.value;
				 switch(e.detail.column){
					case 2://拖动第三列
					switch(this.cityAddressIndex[1]){
						case 0:
						switch(this.cityAddressIndex[2]){
							case e.detail.value:
							this.street1=[]
							this.area.forEach((val) => {
								if(this.area1[e.detail.value] === val.name){
									val.children.forEach((val1) => {
										this.street1.push(val1.name)
									})
								}
							})
							this.cityArray[3] = this.street1;	
							console.log(this.street1)
							break;
						}
						break;
	
					}
					this.cityAddressIndex.splice(3,1,0);
					break;
				 }
				 this.formData.address = this.cityArray[0][this.cityAddressIndex[0]] + this.cityArray[1][this.cityAddressIndex[1]]+this.cityArray[2][this.cityAddressIndex[2]]+this.cityArray[3][this.cityAddressIndex[3]]
				
						 }
	},
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
.input-style{
		width: 250px;
		
	}
</style>