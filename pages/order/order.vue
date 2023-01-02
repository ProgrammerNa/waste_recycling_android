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
	                选项卡1的内容
	            </view>
	            <view v-show="current === 1">
	                选项卡2的内容
	            </view>
	            <view v-show="current === 2">
	                选项卡3的内容
	            </view>
	        </view>
	    </view>
</template>

<script>
	import uSegmentedControl from '../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.vue'
	import uNavBar from '../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
	export default {
		components:{
			uSegmentedControl,
			uNavBar
		},
		data() {
			return {
				 items: ['待处理', '已完成', '全部订单'],
				        current: 0
			}
		},
		methods: {
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
</style>
