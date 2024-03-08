const sequalize = require('../DB')
const { DataTypes } = require('sequelize')

const Need = sequalize.define('need', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.TEXT},
	description: {type: DataTypes.TEXT},
})

module.exports = Need;