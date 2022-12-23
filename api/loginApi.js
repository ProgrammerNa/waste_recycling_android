import request from '../utils/http.js'
export const login1 = (data) => {
	return request({
		method:'GET',
		url:'login',
		data
	})
}