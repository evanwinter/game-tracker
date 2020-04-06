const Logger = {
	log: function(str) {
		if (process.env.NODE_ENV === "development") {
			console.log(str)
		}
	},
}
export default Logger
