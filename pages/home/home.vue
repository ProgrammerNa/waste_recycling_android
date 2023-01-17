<template>
	<view>
			<view class="uni-margin-wrap">
				<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
					:duration="duration">
					<swiper-item>
						<image src="../../static/images/avatar.jpg"></image>
					</swiper-item>
					<swiper-item>
						<image src="../../static/images/orderWating.png"></image>
					</swiper-item>
					<swiper-item>
						<image src="../../static/images/orderFinish.png"></image>
					</swiper-item>
				</swiper>
			</view>
				
			</view>
			<view class="title">
				<view class="title-border"></view>
				<view class="title-content">回收物品类</view>
			</view>
			<view class="uni-grid">
				<uGrid :column="3" @change="selectType">
					<uGridItem>
						<text class="text">废纸类</text>
					</uGridItem>
					<uGridItem>
						<text class="text">塑料类</text>
					</uGridItem>
					<uGridItem>
						<text class="text">玻璃制品类</text>
					</uGridItem>
					<uGridItem>
						<text class="text">金属类</text>
					</uGridItem>
					<uGridItem>
						<text class="text">纺织物类</text>
					</uGridItem>
					<uGridItem>
						<text class="text">其他</text>
					</uGridItem>
				</uGrid>
			</view>

</template>

<script>
	import uGrid from '../../uni_modules/uni-grid/components/uni-grid/uni-grid.vue'
	import uGridItem from '../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.vue'
	import createOrder from './createOrder.vue'
export default {
	components:{
	uGrid,	
	uGridItem,
	createOrder
	},
    data() {
        return {
            indicatorDots: true,
            autoplay: true,
            interval: 2000,
            duration: 500
        }
    },
    methods: {
		selectType(e){
			console.log(e)
			console.log(e.detail.index)
			uni.navigateTo({
				url:'/pages/home/createOrder'
			})
		}
    }
}
</script>

<style>
	.title{
		margin-top: 20px;
		width:100%;
		height: 30px;
		display: flex;
		align-items: center;
	}
	.title .title-border{
		margin-left: 10px;
		height: 15px;
		border-radius: 10px;
		border: 3px solid red;
		}
		.title .title-content{
			margin-left: 10px;
			font-weight: bold;
		}
	.uni-grid{
		margin: 10px 10px 0px 5px;
	}
	.uni-margin-wrap {
		width: 100%;
		margin-top: 10px;
	}
	.swiper {
		margin-top: 40px;
		height: 500rpx;
	}
	.swiper-item {
		display: block;
		height: 500rpx;
		line-height: 500rpx;
		text-align: center;
	}
</style>
