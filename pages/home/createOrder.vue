<template>
	<view class="box-bg">
		<view class="box-bg">
			<uni-nav-bar height="40px" border fixed title="回收详情" left-icon="left" @clickLeft="backPage" />
		</view>
	</view>
	<view class="form">
			<uForms ref="valiForm" :modelValue="formData" :rules="rules" label-width="20" >
				<uFormsItem label="回收类型"   name="recyleType">
					<view class="recyle">
					<view  class="recyle-text">{{formData.recyleType}}</view>
					</view>
				</uFormsItem>
				<uFormsItem label="回收单价(元/斤)"  name="recylePrice">
					<view class="recyle">
					<view  class="recyle-text">{{formData.recylePrice}}</view>
					</view>
				</uFormsItem>
				<uFormsItem label="预估重量(斤)"  required name="weight">
					<view class="input-style">
					<uEasyInput  v-model="formData.weight"  placeholder="请输入重量" />
					</view>
				</uFormsItem>
				<uFormsItem label="回收地址"  required name="address">
					<view class="recyle">
					<view @click="checkAddress" v-if="!formData.address"  class="recyle-text">请选择地址</view>
					<view @click="checkAddress" v-if="formData.address"  class="recyle-text">{{formData.address}}</view>
					</view>
				</uFormsItem>
				<uFormsItem label="上门时间" required  name="value">
					<view class="example-body">
						<uDateTimePicker v-model="formData.value" />
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
	import uDateTimePicker from '../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.vue'
	import store from '../../store/index.js'
	import {ChangeDateFormat} from '../../utils/time.js'
	import dayjs from 'dayjs'
	import {getRecyleTypePrice,getGoods,createOrder} from '../../api/orderApi.js'
	export default {
		components:{
			uForms,
			uFormsItem,
			uEasyInput,
			uDateTimePicker
		},
		data() {
			var validateFunction = (rule, value, data, callback) => {
				if(new Date(value).getTime() < new Date(dayjs(dayjs(this.formData.value)).startOf('day').add(9,'hour').format('YYYY-MM-DD HH:mm:ss')).getTime()){ 
				        callback("预约时间不得早于九点");  
				        return false; 
				    }else if (new Date(value).getTime() > new Date(dayjs(dayjs(this.formData.value)).endOf('day').subtract(5,'hour').format('YYYY-MM-DD HH:mm:ss')).getTime()){
						callback("预约时间不得晚于七点");
						return false; 
					} else if(dayjs(value)  < dayjs(this.formData.value).add(3,'hour')){
						callback("预约时间需超过当前时间三个小时");
						return false; 
					}
					return true
				};
			return {
				formData:{
					recyleType:'',
					recylePrice:'',
					weight:'',
					time:'',
					address:'',
					orderTime:'',
					value:'',
				},
				rules:{
					weight:{
						rules: [
							{
								required: true,
								errorMessage: '请输入预估重量',
							},
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
							value:{
								rules: [
									{
										required: true,
										errorMessage: '请选择上门时间',
									},
									{validateFunction }
									
										],
								},
							
						
						},
				addressId:'',
				goodsId:'',
				userInfo:uni.getStorageSync('userInfo'),
				
			}
		},
		onLoad(option) {
			this.formData.address=option.address
			this.formData.recyleType=option.recyleType
			this.formData.value = parseInt(option.value)
			this.addressId = option.addressId
			if(!option.weight){
				console.log(option.weight)
				this.formData.weight=''
			}else{
				console.log('youshuju',option.weight)
				this.formData.weight=option.weight
			}
		},
		onShow() {
			console.log(this.formData.recyleType)
			if(this.formData.recyleType === '其他'){
				this.formData.recylePrice='面议'
			}else{
				getRecyleTypePrice({
					'name':this.formData.recyleType
				}).then((res) => {
					if(res.data.code === 200){
						console.log(res)
					this.formData.recylePrice=res.data.data
						
					}
				})
			}
			
			getGoods().then((res) => {
				if(res.data.code === 200) {
					res.data.data.forEach((val) => {
						if(val.name === this.formData.recyleType){
							this.goodsId = val.id
							console.log(this.goodsId)
						}
					})
				}
			})
		},
		methods: {
			backPage(){
				uni.switchTab({
					url:'/pages/home/home'
				})
			},
			submit(ref){
				console.log(new Date(dayjs(dayjs(this.formData.value)).startOf('day').add(9,'hour').format('YYYY-MM-DD HH:mm:ss')).getTime())
				console.log(new Date(this.formData.value).getTime())
				this.$refs[ref].validate().then(res => {
									createOrder({
										'userId':this.userInfo.data.id,
										'addressId':this.addressId,
										'bookDate':this.formData.value,
										'details':{
											'goodsId':this.goodsId,
											'weight':this.formData.weight
										}	
									}).then((res) => {
										console.log(res)
										if(res.data.code === 200){
											uni.showToast({
													title: "下单成功",
													icon:"success",
													duration: 2000,
										});
										uni.reLaunch({
											url:'/pages/home/home'
										})
										}
									})
								}).catch(err => {
									console.log('err', err);
								})
				console.log(this.userInfo.data.id)
				console.log(this.addressId)
				console.log(this.orderTime)
				console.log(this.goodsId)
				console.log(this.formData.weight)
				
			},
			checkAddress(){
				uni.navigateTo({
					url:'/pages/address/checkAddress?recyleType='+this.formData.recyleType+'&recylePrice='+this.formData.recylePrice+'&value='+this.formData.value+'&weight='+this.formData.weight
				})
			},
			
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
	.form{
		margin-top: 20px;
		margin-left: 10px;
	}
	.recyle{
		margin-top: 10px;
	}
	
</style>
