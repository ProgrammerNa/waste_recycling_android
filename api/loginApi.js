import request from '../utils/http.js'
export const userlogin = (data) => {
	return request({
		method:'POST',
		url:'login',
		data
	})
}