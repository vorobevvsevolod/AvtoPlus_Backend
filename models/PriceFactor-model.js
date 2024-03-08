const sequalize = require('../DB')
const { DataTypes } = require('sequelize')

const PriceFactor = sequalize.define('price_factor', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.TEXT}
})

module.exports = PriceFactor;