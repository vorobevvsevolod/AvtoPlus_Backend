const { Users } = require('../models/models')
const decodeJwt = require('../utilities/decodeJwt')

module.exports = async function (token){
	try {
		const decode = decodeJwt(token)
		
		const user = await Users.findOne({where: { id: decode.id }})
		
		if (!user) return {status: false};
		
		return {status: true, id: user.id}
		
	}catch (e) {
		return {status: false}
	}
	
}