import { defineStore } from "pinia";

// store 存储数据
export default defineStore({
	id:'main',
	state:() => {
		return {
			token:uni.getStorageSync('token'),
			test:'测试',
		}
	},
	unistorage:true,  //开启后对state的数据读写都将持久化
	actions:{
		setToken(token){
			this.token = token
		},
	}
	// 开启数据缓存
	// persist:{
	// 	enabled:true,
	// 	// 采用的存储方式
	// 	strategies: [
	// 	    {
	// 	      key: 'token',
	// 	      storage: localStorage,   //采用本地存储
	// 		  paths:['token','test']  //持久化局部state，通过 paths 指定要长久化的字段，其余的则不会进行长久化。
	// 	    }
	// 	  ]

	// }
})