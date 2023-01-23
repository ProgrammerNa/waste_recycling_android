<template>
	<view>
		<view class="box-bg">
			<view class="box-bg">
				<uni-nav-bar height="40px" border fixed title="报销资金查询" />
			</view>
		</view>
	</view>
	 <view class="segmented-control">
		  <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text" activeColor="#4cd964"></uni-segmented-control>
		  <view class="content">
		    <view v-show="current === 0">
				<view class="address-list">
						<uList border>
							<uListItem  v-for="(item, index) in waitList" :key="index" >
								<template v-slot:body>
									<view class="list-item-body">
										<view class="list-item-content">
											<view class="header-content">
												<view>申请订单: {{item.orderId}}</view>
												<view v-if="item.status === 0">待接单</view>
											</view>
											<view>
												<view>申请时间: {{item.createTime}}</view>
											</view>
											<view>
												<view>申请金额:  {{item.expenses}}</view>
											</view>
											<view>
												<view>申请备注:  {{item.evidence}}</view>
											</view>
											<view class="btn-content">
											<view>
											<button  class="btn" @click="cancelApplication(item)">取消</button>
											</view>
											<view>
											<button  class="btn" @click="details(item)">详情</button>
											</view>
											</view>
											</view>
										</view>
								</template>
							</uListItem>
						</uList>
				</view>
			</view>
			<view v-show="current === 1">
				<view class="address-list">
						<uList border>
							<uListItem  v-for="(item, index) in finishList" :key="index" >
								<template v-slot:body>
									<view class="list-item-body">
										<view class="list-item-content">
											<view class="header-content">
												<view>申请订单: {{item.orderId}}</view>
												<view v-if="item.status === 1">已办结</view>
											</view>
											<view>
												<view>申请时间: {{item.createTime}}</view>
											</view>
											<view>
												<view>完结时间:  {{item.lastUpdateTime}}</view>
											</view>
											<view>
												<view>申请金额:  {{item.expenses}}</view>
											</view>
											<view>
												<view>申请备注:  {{item.evidence}}</view>
											</view>
											<view class="btn-content">
											<view>
											<button  class="btn" @click="details(item)">详情</button>
											</view>
											</view>
											</view>
										</view>
								</template>
							</uListItem>
						</uList>
				</view>
			</view>
			<view v-show="current === 2">
				<view class="address-list">
						<uList border>
							<uListItem  v-for="(item, index) in cancelList" :key="index" >
								<template v-slot:body>
									<view class="list-item-body">
										<view class="list-item-content">
											<view class="header-content">
												<view>申请订单: {{item.orderId}}</view>
												<view v-if="item.status === -1">已取消</view>
											</view>
											<view>
												<view>申请时间: {{item.createTime}}</view>
											</view>
											<view>
												<view>申请金额:  {{item.expenses}}</view>
											</view>
											<view>
												<view>申请备注:  {{item.evidence}}</view>
											</view>
											<view class="btn-content">
											<view>
											<button  class="btn" @click="details(item)">详情</button>
											</view>
											</view>
											</view>
										</view>
								</template>
							</uListItem>
						</uList>
				</view>
			</view>
		</view>
		 </view>
</template>

<script>
	import {getApplicationList,cancelApplication} from '../../../api/applicationApi.js'
	import uList from '../../../uni_modules/uni-list/components/uni-list/uni-list.vue'
	import uListItem from '../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.vue'
	export default {
		components:{
			uList,
			uListItem
		},
		data() {
			return {
				items:['处理中','已办结','已取消'],
				current:0,
				waitList:[],
				finishList:[],
				cancelList:[],
				userInfo:uni.getStorageSync('userInfo')
			}
		},
		onShow() {
			this.getList()
		},
		methods: {
			onClickItem(e) {
			      if (this.current != e.currentIndex) {
			        this.current = e.currentIndex;
			      }
			},
			getList(){
				getApplicationList({
					'id':this.userInfo.data.id
				}).then(res => {
					if(res.data.code === 200){
						console.log(res)
						res.data.data.forEach((val) => {
							if(val.status === 0){
								this.waitList.push(val)
							}else if(val.status === 1){
								this.finishList.push(val)
							}else if(val.status === -1){
								this.cancelList.push(val)
							}
						})
					}
				})
			},
			cancelApplication(e){
				cancelApplication({
					'applicationId':e.id,
					'status':-1
				}).then((res) => {
					if(res.data.code === 200){
						uni.showToast({
								title: "取消成功",
								icon:"success",
								duration: 2000,
						});
						setTimeout(() => {
							this.waitList=[]
							this.finishList=[]
							this.cancelList=[]
							this.getList()
						},500)
					}
				})
			},
			details(e){
				uni.navigateTo({
					url:'/pages/reimbursementFunds/checkReimbursementFund/details?detail='+encodeURIComponent(JSON.stringify(e))
				})
			}
		}
	}
</script>

<style>
.box-bg{
		margin-top: 15px;
		display: flex;
	}
	.list-item-body{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.list-item-content{
		width: 100%;
	}
	.header-content{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.btn-content{
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
	}
	.btn{
		display: inline-block;
		width: 150px;
		height: 50rpx;
		border: 1px solid #d1d1d1;
		border-radius: 30px;
		text-align: center;
		line-height: 50rpx;
	}
</style>
