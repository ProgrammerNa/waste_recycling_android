<template>
	<view class="box-bg">
		<view class="box-bg">
			<uNavBar height="40px" border fixed title="订单页面" />
		</view>
	</view>	
	  <view class="segmented-control">
	        <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text" activeColor="#4cd964"></uni-segmented-control>
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
													<view v-if="item.status === 0">待处理</view>
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
	                						<view>
	                							<view>{{item}}</view>
	                						</view>
	                						<view v-if="userInfo.data.role[0].name === '回收员'">
	                						<button  class="btn" >已接单 </button>
	                						</view>
											<view v-if="userInfo.data.role[0].name === '普通用户'">
											<button  class="btn">已完成 </button>
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
	                						<view>
	                							<view>{{item}}</view>
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
	import {getOrderList} from '../../api/orderApi.js'
	export default {
		components:{
			uSegmentedControl,
			uNavBar,
			uList,
			uListItem
		},
		data() {
			return {
				items: ['待处理', '已完成', '全部订单'],
				current: 0,
				userInfo:uni.getStorageSync('userInfo'),
				orderWaitList:[],
				orderFinishList:[],
				orderList:[],
			}
		},
		onLoad(option) {
			this.current=parseInt(option.current)
		},
		onShow() {
			this.getList()
		},
		methods: {
			getList(){
				getOrderList({
					'id':this.userInfo.data.id
				}).then((res) => {
					console.log(res)
					if(res.data.code === 200){
						res.data.data.forEach((val) => {
							this.orderList.push(val)
							if(val.status === 0){
								// 待接单状态
								this.orderWaitList.push(val)
							}else if(val.status === 1){
								// 订单已完成状态
								this.orderFinishList.push(val)
							}
						})
					}
					console.log(this.orderWaitList)
					console.log(this.orderFinishList)
					console.log(this.orderList)
				})
			},
			 onClickItem(e) {
			      if (this.current != e.currentIndex) {
			        this.current = e.currentIndex;
			      }
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
</style>
