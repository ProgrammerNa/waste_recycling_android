import request from '../utils/http.js'
 export const getRecyleTypePrice = (data) => {
	 return request({
		 method:'GET',
		 url:'goods/getPriceByName',
		 data
	 })
 }
 
 export const getGoods = () => {
	return request({
			 method:'GET',
			 url:'goods/getGoods',
	})
 }
 export const createOrder = (data) => {
	 return request({
		 method:'POST',
		 url:'order/addOrder',
		 data
	 })
 }
 
 export const getOrderList = (data) => {
	 return request({
		 method:'GET',
		 url:'order/getOrdersByUId',
		 data
	 })
 }


export const updateOrderStatus = (data) => {
	return request({
			 method:'POST',
			 url:'order/updateOrderStatus',
			 data
	})
}


export const getRecyleOrderWatingList = () => {
	return request({
		method:'GET',
		url:'order/getAcceptableOrders',
	})
}


export const acceptOrderByRec = (data) => {
	return request({
			 method:'POST',
			 url:'order/acceptOrderByRec',
			 data
	})
}

export const getOrdersByRId = (data) => {
	return request({
			 method:'GET',
			 url:'order/getOrdersByRId',
			 data
	})
}

export const updateGoodsWeight = (data) => {
	return request({
		method:'POST',
		url:'order/updateGoodsWeight',
		data
	})
}