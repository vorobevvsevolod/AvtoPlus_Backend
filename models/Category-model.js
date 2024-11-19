const sequalize = require('../DB')
const { DataTypes } = require('sequelize')

const Category = sequalize.define('category', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.STRING},
	img: {type: DataTypes.STRING},
	url: {type: DataTypes.STRING}

})

module.exports = Category;