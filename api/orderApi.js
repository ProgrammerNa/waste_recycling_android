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


