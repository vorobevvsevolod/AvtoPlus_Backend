const sequalize = require('../DB')
const { DataTypes } = require('sequelize')

const MaterialProperties = sequalize.define('material_properites', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.TEXT}
})

module.exports = MaterialProperties;