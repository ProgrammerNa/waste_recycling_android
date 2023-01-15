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
							<picker mode="multiSelector" :range="cityArray" @columnchange='selectAddress' >
								<view v-if="!address">请选择省/市/区/街道</view>
								<view v-if="address">{{address}}</view>
							</picker>
						</uFormsItem>
						<uFormsItem label="详细地址" name="addressDetail">
							<input  placeholder="请输入详细地址" />
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
				province:['广西'],
				city:['桂林市'],
				area:['七星区','灵川县'],
				street:['金鸡岭','桂林电子科技大学'],
				cityArray:[
					['广西'],
					['桂林市'],
					['七星区','灵川县'],
					['金鸡岭','桂林电子科技大学'],
				],
				cityAddressIndex:[0,0,0,0],
				address:''
			}
		},
		methods: {
			 selectAddress: function(e) {
				 console.log(e)
				 this.cityAddressIndex[e.detail.column] = e.detail.value;
				 switch(e.detail.column){
					 case(0)://拖动第一列
					 switch(this.cityAddressIndex[0]){
						 case 0 :
						 this.cityArray[1] = ['桂林'];
						 this.cityArray[2]=	['七星区','灵川县'];	
						 this.cityArray[3]=	['金鸡岭','桂林电子科技大学'];	
						 break;
					}
					this.cityAddressIndex.splice(1,1,0);
					this.cityAddressIndex.splice(2,1,0);
					this.cityAddressIndex.splice(3,1,0);
					break;
					case 1://拖动第二列
					switch(this.cityAddressIndex[0]){
						case 0:
						switch(this.cityAddressIndex[1]){
							case 0:
							this.cityArray[2] = ['七星区','灵川县'];	
							break;
						}
						break;
					}
					this.cityAddressIndex.splice(2,1,0);
					this.cityAddressIndex.splice(3,1,0);
					break;
					case 2://拖动第三列
					switch(this.cityAddressIndex[1]){
						case 0:
						switch(this.cityAddressIndex[2]){
							case 0:
							this.cityArray[3] = ['金鸡岭'];	
							break;
							case 1:
							this.cityArray[3] = ['桂林电子科技大学'];	
							break;
						}
						break;
	
					}
					this.cityAddressIndex.splice(3,1,0);
					break;
				 }
				 console.log(this.cityAddressIndex[0])
				 console.log(this.cityAddressIndex[1])
				 console.log(this.cityAddressIndex[2])
				 console.log(this.cityAddressIndex[3])
				 this.address = this.cityArray[0][this.cityAddressIndex[0]] + this.cityArray[1][this.cityAddressIndex[1]]+this.cityArray[2][this.cityAddressIndex[2]]+this.cityArray[3][this.cityAddressIndex[3]]
				
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
</style>