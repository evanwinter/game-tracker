const Logger = {
	dev: false,
	prod: false,

	isDev: () => process.env.NODE_ENV === "development",
	isProd: () => process.env.NODE_ENV === "production",

	log: function(str) {
		if (this.isDev() && this.dev) {
			console.log(str)
			return
		}

		if (this.isProd() && this.prod) {
			console.log(str)
			return
		}
	},
}

export default Logger
