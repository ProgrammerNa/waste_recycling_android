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
			<view v-if="userInfo.data.role[0].name === '普通用户'">
			<view class="title">
				<view class="title-border"></view>
				<view class="title-content">回收物品类</view>
			</view>
			<view class="uni-grid">
				<uGrid :column="3" @change="selectType">
					 <uni-grid-item v-for="item in list" :index="item.index">
					        <text class="text">{{ item.name }}</text>
					    </uni-grid-item>
				</uGrid>
			</view>
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
            duration: 500,
			recyleType:'',
			userInfo:uni.getStorageSync('userInfo'),
			list:[
				{
					index:1,
					name:'废纸类',
				},
				{
					index:2,
					name:'塑料类',
				},
				{
					index:3,
					name:'玻璃制品类',
				},
				{
					index:4,
					name:'金属类',
				},
				{
					index:5,
					name:'纺织物类',
				},
				{
					index:6,
					name:'家电类',
				}
			]
        }
    },
    methods: {
		selectType(e){
			console.log(e)
			console.log(e.detail.index)
			if(e.detail.index === 1){
				this.recyleType = '废纸类'
			}else if(e.detail.index === 2){
				this.recyleType = '塑料类'
			}else if(e.detail.index === 3){
				this.recyleType = '玻璃制品类'
			}else if(e.detail.index === 4){
				this.recyleType = '金属类'
			}else if(e.detail.index === 5){
				this.recyleType = '纺织物类'
			}else{
				this.recyleType = '家电类'
			}
			uni.navigateTo({
				url:'/pages/home/createOrder?recyleType=' + this.recyleType
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
