import request from '../utils/http.js'
export const getAreaList = () => {
	return request({
		method:'GET',
		url:'getArea'
	})
}
