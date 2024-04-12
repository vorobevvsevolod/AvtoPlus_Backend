const sequalize = require('../DB')
const { DataTypes } = require('sequelize')

const TypeOfServices = sequalize.define('type_of_services', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.STRING}

})

module.exports = TypeOfServices;