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
