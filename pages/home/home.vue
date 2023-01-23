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
			<view  v-if="userInfo.data.role[0].name === '回收员'" class="map-box">
				<view style="display: flex;align-items: center;">
				<view style="font-size: 20px;">
					目的地:
				</view>
				<view>
				<input v-model="address" placeholder="请输入目的地" />
				</view>
				<button @click="daohang">导航</button>
				</view>
				<view>
						<view class="page-body">
							<view class="page-section page-section-gap">
								<map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers" :polyline="polyline" @updated="daohang">
								</map>
							</view>
						</view>
				</view>
			</view>

</template>

<script>
	import uGrid from '../../uni_modules/uni-grid/components/uni-grid/uni-grid.vue'
	import uGridItem from '../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.vue'
	import createOrder from './createOrder.vue'
	import {getAreaList} from '../../api/areaApi.js'
export default {
	components:{
	uGrid,	
	uGridItem,
	createOrder
	},
    data() {
        return {
			id:0, // 使用 marker点击事件 需要填写id
			title: 'map',
			latitude:25.284311, 
			longitude: 110.337556,
			covers: [{
				latitude: 25.284311,
				longitude: 110.337556,
				}, {
					latitude:25.311518, 
					longitude: 110.415899,
					}],
					  polyline: [{
					          points: [{latitude:25.284311, longitude: 110.337556},{latitude:this.weidu, longitude: this.jingdu}],
					          color: "#31c27c",
					          width: 10,
					          arrowLine: true,
					          borderWidth: 2 //线的边框宽度，还有很多参数，请看文档 
					        }],
            indicatorDots: true,
            autoplay: true,
            interval: 2000,
            duration: 500,
			recyleType:'',
			userInfo:uni.getStorageSync('userInfo'),
			address:'',
			jingdu:null,
			weidu:null,
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
					name:'其他',
				}
			]
        }
    },
	onShow() {
		
	},
    methods: {
		daohang(){
			getAreaList().then(res => {
				console.log(res)
				if(res.data.code === 200){
					res.data.data.forEach((val) => {
						if(res.data.data.name === this.address){
							this.weidu=val.latitude
							this.jingdu=val.longitude
						}
					})
				}
			})
		},
		reload() {
		        // 页面重载
		        const pages = getCurrentPages()
		        // 声明一个pages使用getCurrentPages方法
		        const curPage = pages[pages.length - 1]
		        // 声明一个当前页面
		        curPage.onLoad(curPage.options) // 传入参数
		        curPage.onShow()
		        curPage.onReady()
		        // 执行刷新
		    },
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
			}else if(e.detail.index === 6){
				this.recyleType = '其他'
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
	.map-box{
		margin-top: 20px;
	}
</style>
