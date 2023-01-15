// 封装的uni.request方法
const header = {
	// token会存储在本地存储中
	Authorization:uni.getStorageSync("token")
}
// const baseUrl = 'http://192.168.193.72:8090/'; //域名或选取所有接口不变的那一部分
const baseUrl = 'http://192.168.193.220:8090/'
 const request = (options = {}) => {
	//异步封装接口，使用Promise处理异步请求
	return new Promise((resolve, reject) => {
		// 发送请求
		uni.request({
			url: baseUrl + options.url || '', //接收请求的API
			method: options.method || 'GET', //接收请求的方式,如果不传默认为GET
			data: options.data || {}, //接收请求的data,不传默认为空
			header: {
				'content-type': 'application/json;charset:utf-8',
				}
		}).then(data => {
			resolve(data);
		}).catch(error => {
			reject(error);
		})
	})
}
export default request;


