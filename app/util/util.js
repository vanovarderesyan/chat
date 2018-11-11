class Util {
	static allowCrossDomain(req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', '*');

		// Request methods you wish to allow
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	  
		// Request headers you wish to allow
		//res.Header("Access-Control-Allow-Headers", "x-access-token");
		res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With, Content-type, Authorization, token, refreshToken');
	  
		// Set to true if you need the website to include cookies in the requests sent
		// to the API (e.g. in case you use sessions)
		res.setHeader('Access-Control-Allow-Credentials', true);
		next();
	};
}

module.exports = Util;