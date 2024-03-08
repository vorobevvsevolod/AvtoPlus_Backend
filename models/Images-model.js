const sequalize = require('../DB')
const { DataTypes } = require('sequelize')

const Images = sequalize.define('images', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	url: {type: DataTypes.STRING}

})

module.exports = Images;