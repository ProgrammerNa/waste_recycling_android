<template>
	<view class="box-bg">
		<view class="box-bg">
			<uNavBar height="40px" border fixed title="订单页面" />
		</view>
	</view>	
	  <view class="segmented-control">
	        <uni-segmented-control v-if="userInfo.data.role[0].name === '普通用户'" :current="current" :values="items" @clickItem="onClickItem" styleType="text" activeColor="#4cd964"></uni-segmented-control>
			<uni-segmented-control v-if="userInfo.data.role[0].name === '回收员'" :current="current" :values="recyleItems" @clickItem="onClickItem" styleType="text" activeColor="#4cd964"></uni-segmented-control>
	        <view class="content">
	            <view v-show="current === 0">
	                <view class="address-list">
	                		<uList border>
	                			<uListItem  v-for="(item, index) in orderWaitList" :key="index" >
	                				<template v-slot:body>
	                					<view class="list-item-body">
	                						<view class="list-item-content">
												<view class="header-content">
													<view>{{item.address.name}}</view>
													<view style="margin-left: 10rpx;">{{item.address.phone}}</view>
													<view v-if="item.status === 0">待接单</view>
												</view>
												<view>
													<view>回收类型:  {{item.goodsName}}</view>
												</view>
												<view>
													<view>预估重量:  {{item.details[0].weight}}kg</view>
												</view>
												<view>
													<view>下单时间:  {{item.date}}</view>
												</view>
												<view>
													<view>取货时间:  {{item.bookDate}}</view>
												</view>
												<view class="btn-content">
												<view v-if="userInfo.data.role[0].name === '回收员'">
												<button  class="btn" @click="reciveOrder(item)">接单</button>
												</view>
												<view v-if="userInfo.data.role[0].name === '普通用户'">
												<button  class="btn" @click="cancelOrder(item)">取消</button>
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
	                			<uListItem  v-for="(item, index) in orderFinishList" :key="index" >
	                				<template v-slot:body>
	                					<view class="list-item-body">
	                						<view class="list-item-content">
	                							<view class="header-content">
	                								<view>{{item.address.name}}</view>
	                								<view style="margin-left: 10rpx;">{{item.address.phone}}</view>
	                								<view v-if="item.status === 2">已完成</view>
													<view v-if="item.status === 1">已接单</view>
	                							</view>
	                							<view>
	                								<view>回收类型:  {{item.goodsName}}</view>
	                							</view>
	                							<view v-if="item.status === 1">
	                								<view>预估重量:  {{item.details[0].weight}}kg</view>
	                							</view>
												<view v-if="item.status === 2">
													<view>实际重量:  {{item.details[0].weight}}kg</view>
												</view>
	                							<view>
	                								<view>下单时间:  {{item.date}}</view>
	                							</view>
	                							<view>
	                								<view>取货时间:  {{item.bookDate}}</view>
	                							</view>
												<view class="btn-content">
												<view v-if="userInfo.data.role[0].name === '回收员'">
												<button  class="btn" @click="recyleRecyleOrder(item)">完成</button>
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
	                			<uListItem  v-for="(item, index) in orderList" :key="index" >
	                				<template v-slot:body>
	                					<view class="list-item-body">
	                						<view class="list-item-content">
	                							<view class="header-content">
	                								<view>{{item.address.name}}</view>
	                								<view style="margin-left: 10rpx;">{{item.address.phone}}</view>
	                								<view v-if="item.status === 2">已完成</view>
													<view v-if="item.status === 0">待接单</view>
													<view v-if="item.status === 1">已接单</view>
													<view v-if="item.status === -1">已取消</view>
	                							</view>
	                							<view>
	                								<view>回收类型:  {{item.goodsName}}</view>
	                							</view>
	                							<view v-if="item.status !== 2">
	                								<view>预估重量:  {{item.details[0].weight}}kg</view>
	                							</view>
	                							<view v-if="item.status === 2">
	                								<view>实际重量:  {{item.details[0].weight}}kg</view>
	                							</view>
	                							<view>
	                								<view>下单时间:  {{item.date}}</view>
	                							</view>
	                							<view>
	                								<view>取货时间:  {{item.bookDate}}</view>
	                							</view> 
												<view class="btn-content">
												<view v-if="userInfo.data.role[0].name === '回收员' && item.status === 2">
												<button  class="btn"  @click="inputDialogToggle">获利:￥10</button>
												</view>
												</view>
												<view>
															<!-- 输入框示例 -->
															<uni-popup ref="inputDialog" type="dialog">
																<uni-popup-dialog ref="inputClose"  mode="input" title="请输入实际重量" value=" "
																	placeholder="请输入内容" @confirm="dialogInputConfirm"></uni-popup-dialog>
															</uni-popup>
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
	import uSegmentedControl from '../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.vue'
	import uNavBar from '../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
	import uList from '../../uni_modules/uni-list/components/uni-list/uni-list.vue'
	import uListItem from '../../uni_modules/uni-list/components/uni-list-item/uni-list-item.vue'
	import {getOrderList,updateOrderStatus,getRecyleOrderWatingList,acceptOrderByRec,getOrdersByRId} from '../../api/orderApi.js'
	export default {
		components:{
			uSegmentedControl,
			uNavBar,
			uList,
			uListItem
		},
		data() {
			return {
				items: ['待接单', '已完成', '全部订单'],
				recyleItems:['待接单', '已接单', '已完成'],
				current: 0,
				userInfo:uni.getStorageSync('userInfo'),
				orderWaitList:[],
				orderFinishList:[],
				orderList:[],
				weight:'',
				show:false
			}
		},
		onLoad(option) {
			this.current=parseInt(option.current)
		},
		onShow() {
			this.getList()
			console.log(this.orderFinishList)
		},
		methods: {
			inputDialogToggle() {
							this.$refs.inputDialog.open()
						},
			getList(){
				if(this.userInfo.data.role[0].name === "普通用户"){
					getOrderList({
						'id':this.userInfo.data.id
					}).then((res) => {
						if(res.data.code === 200){
							res.data.data.forEach((val) => {
								this.orderList.push(val)
								if(val.status === 0){
									// 待接单状态
									this.orderWaitList.push(val)
								}else if(val.status === 2){
									// 订单已完成状态
									this.orderFinishList.push(val)
								}
							})
						}
					})
				}else if(this.userInfo.data.role[0].name === "回收员"){
					getOrdersByRId({
						'id':this.userInfo.data.id
					}).then(res => {
						console.log(res)
						res.data.data.forEach((val) => {
							if(val.status === 1){
								// 订单已接单状态
								this.orderFinishList.push(val)
							}else if(val.status === 2){
								// 订单已完成
								this.orderList.push(val)
							}
						})
					})
					getRecyleOrderWatingList().then(res => {
						if(res.data.code === 200){
							res.data.data.forEach((val) => {
								if(val.status === 0){
									// 待接单状态
									this.orderWaitList.push(val)
								}
							})
						}
					})
					
				}
			},
			 onClickItem(e) {
			      if (this.current != e.currentIndex) {
			        this.current = e.currentIndex;
			      }
			},
			reciveOrder(e){
				acceptOrderByRec({
					'orderId':e.id,
					'recyclerId':this.userInfo.data.id
				}).then((res) => {
					if(res.data.code === 200){
						uni.showToast({
								title: "接单成功",
								icon:"success",
								duration: 2000,
						});
						setTimeout(() => {
							this.orderWaitList=[]
							this.orderList=[]
							this.orderFinishList=[]
							this.getList()
						},500)
					}
				})
			},
			cancelOrder(e){
				updateOrderStatus({
					'orderId':e.id,
					'status':-1
				}).then((res) => {
					if(res.data.code === 200){
						uni.showToast({
								title: "取消成功",
								icon:"success",
								duration: 2000,
						});
						setTimeout(() => {
							this.orderWaitList=[]
							this.orderList=[]
							this.orderFinishList=[]
							this.getList()
						},500)
					}
				})
			},
			recyleRecyleOrder(e){
				this.show = true
			}
		}
	}
</script>

<style>
	.box-bg{
		margin-top: 10px;
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
		width: 150px;
		height: 50rpx;
		border: 1px solid #d1d1d1;
		border-radius: 30px;
		text-align: center;
		line-height: 50rpx;
	}
</style>
