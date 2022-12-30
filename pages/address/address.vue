<template>
	<view class="box-bg">
		<view class="box-bg">
			<uNavBar height="40px" border fixed title="我的收货地址" />
		</view>
	</view>	
	<view class="address-list">
			<uList border>
				<uListItem  v-for="(item, index) in list" :title="item" :key="index" ></uListItem>
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
	export default {
		components:{
			uNavBar,
			uList,
			uListItem,
		},
		data() {
			return {
				list:['西湖区','滨江区','余杭区','滨江区']
			}
		},
		methods: {
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
</style>
