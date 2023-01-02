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
			
			<view class="uni-grid">
				<uGrid :column="3">
					<uGridItem>
						<text class="text">回收类1</text>
					</uGridItem>
					<uGridItem>
						<text class="text">回收类2</text>
					</uGridItem>
					<uGridItem>
						<text class="text">回收类3</text>
					</uGridItem>
					<uGridItem>
						<text class="text">回收类4</text>
					</uGridItem>
					<uGridItem>
						<text class="text">回收类5</text>
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
export default {
	components:{
	uGrid,	
	uGridItem
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
    }
}
</script>

<style>
	.uni-grid{
		margin-top: 10px;
	}
	.uni-margin-wrap {
		width: 100%;
		margin-top: 10px;
	}
	.swiper {
		height: 500rpx;
	}
	.swiper-item {
		display: block;
		height: 500rpx;
		line-height: 500rpx;
		text-align: center;
	}
</style>
