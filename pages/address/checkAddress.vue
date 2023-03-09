<template>
	<view class="box-bg">
		<view class="box-bg">
			<uNavBar height="40px" border fixed title="选择回收地址" left-icon="left" @clickLeft="backPage" />
		</view>
	</view>	
	<view class="address-list">
		<radio-group @change="radioChange">
			<label  v-for="(item, index) in list" :key="index">
								<uList border>
									<uListItem>
										<template v-slot:body>
											<view class="list-item-body">
												<radio :value="item" :checked="index === current" />
												<view>
												<view class="list-header">
												<view class="header-name">{{item.name}}</view>
												<view class="header-phone">{{item.phone}}</view>
												</view>
												 <view class="footer-address">{{item.areaName}}{{item.fullAddress}}</view>
												</view>
											</view>
										</template>
									</uListItem>
								</uList>
							</label>
			</radio-group>
	</view>
</template>

<script>
	import uNavBar from '../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
	import uList from '../../uni_modules/uni-list/components/uni-list/uni-list.vue'
	import uListItem from '../../uni_modules/uni-list/components/uni-list-item/uni-list-item.vue'
	import {getAddressList} from '../../api/areaApi.js'
	export default {
		components:{
			uNavBar,
			uList,
			uListItem
		},
		data() {
			return {
				list:[],
				userInfo:uni.getStorageSync('userInfo'),
				current:null,
				detailAddress:'',
				recyleType:'',
				recylePrice:'',
				weight:'',
				value:'',
			}
		},
		onLoad(option) {
			this.recyleType = option.recyleType
			this.recylePrice = option.recylePrice
			this.value = option.value
			this.weight = option.weight
			console.log(option)
		},
		onShow() {
			getAddressList({
				'id':this.userInfo.data.id
			}).then((res) => {
				if(res.data.code === 200){
					this.list=res.data.data
					console.log(this.list)
				}
			})
		},
		methods: {
			backPage(){
				uni.navigateBack({
					url:'/pages/home/createOrder'
				})
			},
			radioChange(e){
				console.log(e)
				this.detailAddress = e.detail.value.areaName +e.detail.value.fullAddress
				uni.redirectTo({
					url:'/pages/home/createOrder?address='+this.detailAddress+'&recyleType='+this.recyleType+'&addressId='+ e.detail.value.id+'&recylePrice='+this.recylePrice+'&value='+this.value+'&weight='+this.weight
				})
			}
		}
	}
</script>

<style>
.box-bg{
	margin-top: 10px;
	display: flex;
	flex:2;
}
  .footer {
	  position: fixed;
	  bottom: 0;
	  width: 100%;
    }
	.footer button {
		background-color: #ff2c19;
		color: white;
		border-radius: 30px;
	}
	.list-header{
		display: flex;
		align-items: center;
	}
	.list-header .header-phone{
		margin-left: 10px;
	}
	.list-item-body{
		width: 100%;
		display: flex;
		align-items: center;
	}
	.slot-image {
		    display: flex;
			width: 30px;
			height: 30px;
		}
</style>
