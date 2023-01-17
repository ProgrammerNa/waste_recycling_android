<template>
	<view class="box-bg">
		<view class="box-bg">
			<uNavBar height="40px" border fixed title="我的收货地址" />
		</view>
	</view>	
	<view class="address-list">
			<uList border>
				<uListItem  v-for="(item, index) in list" :key="index" >
					<template v-slot:body>
						<view class="list-item-body">
							<view>
							<view class="list-header">
							<view class="header-name">{{item.name}}</view>
							<view class="header-phone">{{item.phone}}</view>
							</view>
							 <view class="footer-address">{{item.areaName}}{{item.fullAddress}}</view>
							</view>
							<view class="slot-image">
							<image  src="../../static/images/edit.png" mode="widthFix" @click="edit(index)"></image>
							</view>
						</view>
					</template>
				</uListItem>
			</uList>
	</view>
	<view class="footer">
		<button @click="addAddress">新增收货地址</button>
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
				userInfo:uni.getStorageSync('userInfo')
			}
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
			edit(e){
				uni.navigateTo({
					url:'/pages/address/editAddress?detail=' +encodeURIComponent(JSON.stringify(this.list[e])) +'&type= "编辑"'  
				})
			},
			addAddress(){
				uni.navigateTo({
					url:'/pages/address/addAddress'
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
		justify-content: space-between;
	}
	.slot-image {
		    display: flex;
			width: 30px;
			height: 30px;
		}
</style>
