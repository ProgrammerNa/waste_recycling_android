import request from '../utils/http.js'
export const updateUserInformation = (data) => {
	return request({
		method:'POST',
		url:'user/modifyImfo',
		data
	})
}

export const checkPassword = (data) => {
	return request({
		method:'POST',
		url:'user/modifyPassword',
		data
	})
}



