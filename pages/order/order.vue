<template>
	<view class="box-bg">
		<view class="box-bg">
			<uNavBar height="40px" border fixed title="订单页面" left-icon="left" @clickLeft="backPage" />
		</view>
	</view>
	<view :class="{'showBack':show,'showBack':showWarn}">
		<view class="segmented-control">
			<uni-segmented-control v-if="userInfo.data.role[0].name === '普通用户'" :current="current" :values="items"
				@clickItem="onClickItem" styleType="button" activeColor="#4cd964"></uni-segmented-control>
			<uni-segmented-control v-if="userInfo.data.role[0].name === '回收员'" :current="current" :values="recyleItems"
				@clickItem="onClickItem" styleType="button" activeColor="#4cd964"></uni-segmented-control>
			<view class="content">
				<view v-show="current === 0">
					<view class="address-list">
						<uList border>
							<uListItem v-for="(item, index) in orderWaitList" :key="index">
								<template v-slot:body>
									<view class="list-item-body">
										<view class="list-item-content">
											<view class="header-content">
												<view>{{item.address.name}}</view>
												<view style="margin-left: 10rpx;">{{item.address.phone}}</view>
												<view v-if="item.status === 0">待接单</view>
											</view>
											<view>
												<view>订单编号: {{item.id}}</view>
											</view>
											<view>
												<view>回收类型: {{item.goodsItem.name}}</view>
											</view>
											<view>
												<view>预估重量: {{item.details[0].weight}}斤</view>
											</view>
											<view>
												<view>下单时间: {{time}}</view>
											</view>
											<view>
												<view>取货时间: {{item.bookDate}}</view>
											</view>
											<view class="btn-content">
												<view v-if="userInfo.data.role[0].name === '回收员'">
													<button class="btn" @click="reciveOrder(item)">接单</button>
												</view>
												<view v-if="userInfo.data.role[0].name === '普通用户'">
													<button class="btn" @click="cancelOrder(item)">取消</button>
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
							<uListItem v-for="(item, index) in orderFinishList" :key="index">
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
												<view>订单编号: {{item.id}}</view>
											</view>
											<view>
												<view>回收类型: {{item.goodsItem.name}}</view>
											</view>
											<view v-if="item.status === 1">
												<view>预估重量: {{item.details[0].weight}}斤</view>
											</view>
											<view v-if="item.status === 2">
												<view>实际重量: {{item.details[0].weight}}斤</view>
											</view>
											<view>
												<view>下单时间: {{time}}</view>
											</view>
											<view>
												<view>取货时间: {{item.bookDate}}</view>
											</view>
											<view class="btn-content">
												<view v-if="userInfo.data.role[0].name === '回收员'">
													<button class="btn" @click="recyleRecyleOrder(item)">完成</button>
												</view>
											</view>
											<view class="btn-content">
												<view v-if="userInfo.data.role[0].name === '普通用户' && item.status === 2">
													<button v-if="item.goodsItem.name !== '其他'" class="btn"
														@click="inputDialogToggle">金额:{{item.details[0].weight * item.goodsItem.price}}</button>
													<button v-if="item.goodsItem.name === '其他'" class="btn"
														@click="inputDialogToggle">金额:{{item.details[0].weight * item.details[0].ifPrice}}</button>
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
							<uListItem v-for="(item, index) in orderList" :key="index">
								<template v-slot:body>
									<view class="list-item-body">
										<view class="list-item-content">
											<view v-if="userInfo.data.role[0].name === '回收员'">
												<view class="header-content">
													<view>{{item.data.address.name}}</view>
													<view style="margin-left: 10rpx;">{{item.data.address.phone}}</view>
													<view v-if="item.data.status === 2">已完成</view>
													<view v-if="item.data.status === 0">待接单</view>
													<view v-if="item.data.status === 1">已接单</view>
													<view v-if="item.data.status === -1">已取消</view>
												</view>
												<view>
													<view>订单编号: {{item.data.id}}</view>
												</view>
												<view>
													<view>回收类型: {{item.data.goodsItem.name}}</view>
												</view>
												<view v-if="item.status !== 2">
													<view>预估重量: {{item.data.details[0].weight}}斤 </view>
												</view>
												<view v-if="item.status === 2">
													<view>实际重量: {{item.data.details[0].weight}}斤</view>
												</view>
												<view>
													<view>下单时间: {{time}}</view>
												</view>
												<view>
													<view>取货时间: {{item.data.bookDate}}</view>
												</view>
												<view class="btn-content">
													<view v-if=" item.data.status === 2">
														<button class="btn" @click="inputDialogToggle">获利:￥10</button>
														<button class="btn" @click="applactionMoney(item)"
															:disabled="item.data.canApplication === 0?true:false">申请资金报销</button>
													</view>
												</view>
											</view>
											<view v-if="userInfo.data.role[0].name === '普通用户'">
												<view class="header-content">
													<view>{{item.address.name}}</view>
													<view style="margin-left: 10rpx;">{{item.address.phone}}</view>
													<view v-if="item.status === 2">已完成</view>
													<view v-if="item.status === 0">待接单</view>
													<view v-if="item.status === 1">已接单</view>
													<view v-if="item.status === -1">已取消</view>
												</view>
												<view>
													<view>订单编号: {{item.id}}</view>
												</view>
												<view>
													<view>回收类型: {{item.goodsItem.name}}</view>
												</view>
												<view v-if="item.status !== 2">
													<view>预估重量: {{item.details[0].weight}}斤</view>
												</view>
												<view v-if="item.status === 2">
													<view>实际重量: {{item.details[0].weight}}斤</view>
												</view>
												<view>
													<view>下单时间: {{time}}</view>
												</view>
												<view>
													<view>取货时间: {{item.bookDate}}</view>
												</view>
												<view class="btn-content">
													<view v-if="item.status === 2">
														<button v-if="item.goodsItem.name !== '其他'" class="btn"
															@click="inputDialogToggle">金额:{{item.details[0].weight * item.goodsItem.price}}</button>
														<button v-if="item.goodsItem.name === '其他'" class="btn"
															@click="inputDialogToggle">金额:{{item.details[0].weight * item.details[0].ifPrice}}</button>
													</view>
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
		<view :class="{'mask':show}"></view>
	</view>
	<view class="poupBox">
		<view v-if="show" class="poup">
			<view class="title" v-if="type !== '其他'">请填写回收物品的实际重量</view>
			<view class="title" v-if="type === '其他'">请填写回收物品的实际重量与实际回收价格</view>
			<view class="content">
				<uEasyInput v-model="weight" placeholder="请输入回收物品的实际重量,单位斤" />
				<uEasyInput style="margin-top:20px" v-if="type === '其他'" v-model="price"
					placeholder="请输入回收物品的实际回收价格,单位元" />
			</view>
			<view class="optionBtn">
				<view class="cancelText" @click="cancelBtn">取消</view>
				<view class="confirmText" @click="confirmBtn">确认</view>
			</view>
		</view>
	</view>
	<view class="poupBox" v-if="showWarn">
		<view class="poup">
			<view class="title">实际重量不能为空且必须为数字</view>
			<view class="title" v-if="type === '其他'">实际回收价格不能为空且必须为数字</view>
			<view class="optionBtn">
				<view class="cancelText" @click="cancelBtn1">取消</view>
				<view class="confirmText" @click="confirmBtn1">确认</view>
			</view>
		</view>

	</view>
</template>

<script>
	import uForms from '../../uni_modules/uni-forms/components/uni-forms/uni-forms.vue'
	import uFormsItem from '../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue'
	import uEasyInput from '../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue'
	import uSegmentedControl from '../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.vue'
	import uNavBar from '../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
	import uList from '../../uni_modules/uni-list/components/uni-list/uni-list.vue'
	import uListItem from '../../uni_modules/uni-list/components/uni-list-item/uni-list-item.vue'
	import {
		ChangeDateFormat
	} from '../../utils/time.js'
	import {
		getRecyleTypePrice,
		getOrderList,
		updateOrderStatus,
		getRecyleOrderWatingList,
		acceptOrderByRec,
		getOrdersByRId,
		updateGoodsWeight,
		updateGoodsPrice
	} from '../../api/orderApi.js'
	export default {
		components: {
			uSegmentedControl,
			uNavBar,
			uList,
			uListItem,
			uForms,
			uFormsItem,
			uEasyInput
		},
		data() {
			return {
				items: ['待接单', '已完成', '全部订单'],
				recyleItems: ['待接单', '已接单', '已完成'],
				current: 0,
				userInfo: uni.getStorageSync('userInfo'),
				orderWaitList: [],
				orderFinishList: [{
					disabled: false
				}],
				orderList: [],
				weight: '',
				show: false,
				orderId: '',
				showWarn: false,
				goodsId: '',
				money: 0,
				recylePrice: '',
				btnShow: false,
				id: '',
				time: '',
				price: '',
				type: ''
			}
		},
		onLoad(option) {
			this.current = parseInt(option.current)
		},
		onShow() {
			this.getList()
			console.log(this.orderList)
			console.log(this.id)
			this.orderList.forEach((val) => {
				console.log(val.disabled)
				if (val.data.id === parseInt(this.id)) {
					val.disabled = true
				}
			})
			console.log(this.orderList)
		},
		methods: {
			backPage() {
				uni.switchTab({
					url: '/pages/index/index'
				})
				console.log("sss")
			},
			applactionMoney(e, index) {

				uni.redirectTo({
					url: '/pages/reimbursementFunds/reimbursementFunds?id=' + e.data.id + '&index=' + index
				})
			},
			getList() {
				if (this.userInfo.data.role[0].name === "普通用户") {
					getOrderList({
						'id': this.userInfo.data.id
					}).then((res) => {
						console.log(res)
						if (res.data.code === 200) {
							res.data.data.forEach((val) => {
								this.orderList.push(val)
								if (val.status === 0) {
									// 待接单状态
									this.time = ChangeDateFormat(val.date)
									this.orderWaitList.push(val)
								} else if (val.status === 2) {
									// 订单已完成状态
									this.time = ChangeDateFormat(val.date)
									this.recylePrice = val.goodsItem.price
									console.log(this.recylePrice)
									this.orderFinishList.push(val)
								}
							})
						}
					})
				} else if (this.userInfo.data.role[0].name === "回收员") {
					getOrdersByRId({
						'id': this.userInfo.data.id
					}).then(res => {
						res.data.data.forEach((val) => {
							if (val.status === 1) {
								// 订单已接单状态
								this.time = ChangeDateFormat(val.date)
								this.orderFinishList.push(val)
							} else if (val.status === 2) {
								// 订单已完成
								this.time = ChangeDateFormat(val.date)
								this.orderList.push({
									data: val,
									disabled: false
								})
							}
						})
						console.log(this.orderList)
					})
					console.log(this.orderList)
					getRecyleOrderWatingList().then(res => {
						if (res.data.code === 200) {
							console.log(res)
							res.data.data.forEach((val) => {
								this.time = ChangeDateFormat(val.date)
								if (val.status === 0) {
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
			reciveOrder(e) {
				acceptOrderByRec({
					'orderId': e.id,
					'recyclerId': this.userInfo.data.id
				}).then((res) => {
					if (res.data.code === 200) {
						uni.showToast({
							title: "接单成功",
							icon: "success",
							duration: 2000,
						});
						setTimeout(() => {
							this.orderWaitList = []
							this.orderList = []
							this.orderFinishList = []
							this.getList()
						}, 500)
					}
				})
			},
			cancelOrder(e) {
				updateOrderStatus({
					'orderId': e.id,
					'status': -1
				}).then((res) => {
					if (res.data.code === 200) {
						uni.showToast({
							title: "取消成功",
							icon: "success",
							duration: 2000,
						});
						setTimeout(() => {
							this.orderWaitList = []
							this.orderList = []
							this.orderFinishList = []
							this.getList()
						}, 500)
					}
				})
			},
			recyleRecyleOrder(e) {
				this.orderId = e.id
				this.show = true
				this.goodsId = e.details[0].goodsId
				this.type = e.goodsItem.name
			},
			cancelBtn() {
				this.show = false
			},
			cancelBtn1() {
				this.showWarn = false
			},
			confirmBtn1() {
				this.showWarn = false
			},
			update(){
				updateGoodsWeight({
					'orderId': this.orderId,
					'weight': this.weight,
					'goodsId': this.goodsId,
					'ifPrice': this.price ? this.price : 0
				}).then((res) => {
					if (res.data.code === 200) {
						updateOrderStatus({
							'orderId': this.orderId,
							'status': 2
						}).then((res) => {
							if (res.data.code === 200) {
								this.show = false
								uni.showToast({
									title: "订单完成",
									icon: "success",
									duration: 2000,
								});
								setTimeout(() => {
									this.orderWaitList = []
									this.orderList = []
									this.orderFinishList = []
									this.getList()
								}, 500)
							}
						})
					}
				})
			},
			confirmBtn() {
				if (this.price) {
					if (this.weight === '' || isNaN(this.weight) || parseFloat(this.weight) <= 0 || this.price === '' ||
						isNaN(this.price) || parseFloat(this.price) <= 0) {
						this.showWarn = true
					}else{
						this.update()
					}
				} else {
					if (this.weight === '' || isNaN(this.weight) || parseFloat(this.weight) <= 0) {
						this.showWarn = true
					}else{
						this.update()
					}
				}

			}
		}
	}
</script>

<style>
	.box-bg {
		margin-top: 10px;
		display: flex;
		flex: 2;
	}

	.list-item-body {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.list-item-content {
		width: 100%;
	}

	.header-content {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.btn-content {
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
	}

	.btn {
		display: inline-block;
		width: 150px;
		height: 50rpx;
		border: 1px solid #d1d1d1;
		border-radius: 30px;
		text-align: center;
		line-height: 50rpx;
	}

	.showBack {
		width: 100%;
		height: 100%;
		position: relative;

	}

	.mask {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
		position: absolute;
		top: 0;
		left: 0;
	}

	.poupBox {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.poup {
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		width: 400px;
		height: 300px;
		background-color: #ffffff;
		border: 1px solid lightgrey;
		border-radius: 10px;
		box-shadow: 10px 10px 10px #c6c6c6;
	}

	.content {
		margin-left: 10px;
		margin-right: 10px;
	}

	.optionBtn {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.cancelText {
		width: 50%;
		text-align: center;
		border: 1px solid #c6c6c6;
		margin-left: 10px;
		margin-right: 10px;
	}

	.confirmText {
		width: 50%;
		text-align: center;
		border: 1px solid #c6c6c6;
		margin-left: 10px;
		margin-right: 10px;
	}

	.title {
		font-size: 20px;
		text-align: center;
		width: 100%;
		margin-top: 20px;
		margin-bottom: 10px;
	}
</style>
