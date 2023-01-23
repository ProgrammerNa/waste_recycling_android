import request from '../utils/http.js'
export const submitApplication = (data) => {
	return request({
		method:'POST',
		url:'application/submitApplication',
		data
	})
}
export const getApplicationList = (data) => {
	return request({
		method:'GET',
		url:'application/getById',
		data
	})
}

export const cancelApplication = (data) => {
	return request({
		method:'POST',
		url:'application/updateStatus',
		data
	})
}