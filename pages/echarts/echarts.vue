<template>
	<view class="box-bg">
		<view class="box-bg">
			<uni-nav-bar height="40px" border fixed title="统计分析" />
		</view>
	</view>
	<view class="uni-list-cell-db">
		<picker mode="date" :value="date" :start="startDate"  fields="year" :end="endDate" @change="bindDateChange">
			<view>
			<view style="display: inline-block;"><text>请选择统计时间:</text><view style="display: inline-block;border: 1px solid #d1d1d1; width: 300px;">{{date}}</view></view>
			</view>
		</picker>
	</view>
  <view class="charts-box" >
		  <view>{{userInfo.data.nickName}}完成订单数统计</view>
		  <qiun-data-charts
		    type="pie"
		    :opts="opts"
		    :chartData="chartData1"
			v-if="orderData.length > 0"
		  />
		   <view v-if="orderData.length <=0" >暂无{{this.date}}年的收益数据</view>
	</view>
		  <view class="charts-box">
		  		  <view>{{userInfo.data.nickName}}收益金额统计</view>
		  		  <qiun-data-charts
		  		    type="pie"
		  		    :opts="opts"
		  		    :chartData="chartData"
					v-if="moneyData.length > 0"
		  		  />
				  <view v-if="moneyData.length <=0" >暂无{{this.date}}年的收益数据</view>
		  	</view>
	
</template>

<script>
export default {
  data() {
	   const currentDate = this.getDate({
		   format: true,
		   })
    return {
		orderData:[],
		moneyData:[],
		date: currentDate,
		userInfo:uni.getStorageSync('userInfo'),
      chartData: {},
      //您可以通过修改 config-ucharts.js 文件中下标为 ['pie'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
        color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
        padding: [5,5,5,5],
        enableScroll: false,
        extra: {
          pie: {
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: true,
            borderWidth: 3,
            borderColor: "#FFFFFF"
          }
        }
      }
    };
  },
  onReady() {
    this.getServerData();
  },

  methods: {
	  bindDateChange: function(e) {
	             this.date = e.detail.value
				 this.moneyData= []
				 this.orderData = []
				 this.getServerData()
				 
	         },
	  clearInput: function(event) {
	              this.date = event.detail.value;
	              if (event.detail.value.length > 0) {
	                  this.showClearIcon = true;
	              } else {
	                  this.showClearIcon = false;
	              }
	          },
	  getDate(type) {
	              const date = new Date();
	              let year = date.getFullYear();
	  
	              if (type === 'start') {
	                  year = year - 60;
	              } else if (type === 'end') {
	                  year = year + 2;
	              }
	              return `${year}`;
	          },
    getServerData() {
		let res = [];
		let res1 = [];
		uni.request({
			url:'http://192.168.193.220:8090/order/orderStatistics',
			method:'POST',
			data:{
				'id':this.userInfo.data.id,
				'year':this.date,
			},
		}).then((res) =>{
			console.log(res.data.data)
			if(res.data.code === 200){
				Object.keys(res.data.data).forEach((item) => {
					res.data.data[item].forEach((val,index) => {
						if(index === 0){
							this.orderData.push({
								name:item,
								value:val
							})
						}else{
							this.moneyData.push({
								name:item,
								value:val
							})
						}
					})
				})
				if(this.moneyData){
					console.log(this.moneyData)
					res = {
					    series: [
					      {
					        data:this.moneyData
					      }
					    ]
					  };
					    this.chartData = JSON.parse(JSON.stringify(res));
				}
				if(this.orderData){
					res1 = {
					    series: [
					      {
					        data:this.orderData
					      }
					    ]
					  };
					   this.chartData1 = JSON.parse(JSON.stringify(res1));
				}
				 
				  
			}
		})
    },
  }
};
</script>

<style scoped>
  /* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
  .charts-box {
	margin-top:30px;
    width: 100%;
    height: 300px;
  }
</style>