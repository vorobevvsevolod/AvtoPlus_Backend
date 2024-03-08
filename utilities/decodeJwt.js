const jwt = require('jsonwebtoken')

module.exports = function (token){
	return jwt.verify(token, process.env.SECRET_KEY)
}