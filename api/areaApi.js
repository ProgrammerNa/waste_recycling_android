import request from '../utils/http.js'
export const getAreaList = () => {
	return request({
		method:'GET',
		url:'getArea'
	})
}

export const addAddress = (data) => {
	return request({
		method:'POST',
		url:'address/addAddress',
		data
	})
}

export const getAddressList = (data) => {
	return request({
		method:'GET',
		url:'address/getAddress',
		data
	})
}

export const updateAddress = (data) => {
	return request({
		method:'POST',
		url:'address/modifyAddress',
		data
	})
}
