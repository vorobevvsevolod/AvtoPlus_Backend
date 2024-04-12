const sequalize = require('../DB')
const { DataTypes } = require('sequelize')

const MaterialFromLocation = sequalize.define('materials_from_location', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},

})

module.exports = MaterialFromLocation;