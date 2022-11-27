module.exports = {
	devServer:{
		port:'3000',
		disableHostCheck:true,
		proxy:{
			'/api':{
				target:'https://localhost/',
				changeOrigin:true,
				pathRewrite:{
					'^/api': '/api'
				}
			}
		}
	}
}