const sequalize = require('../DB')
const { DataTypes } = require('sequelize')

const Materials = sequalize.define('materials', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	title: {type: DataTypes.TEXT},
	descriptionTitle: {type: DataTypes.TEXT},
	description: {type: DataTypes.TEXT},
	url: {type: DataTypes.STRING},

	lastYear: {type: DataTypes.TEXT},

	features: {type: DataTypes.TEXT},

	slogan: {type: DataTypes.TEXT},
	seoTitle: {type: DataTypes.TEXT},
	seoDescription: {type: DataTypes.TEXT},
	
	priceDescription: {type: DataTypes.TEXT},

	Price_Over_300: {type: DataTypes.INTEGER},
	Price_Up_To_300: {type: DataTypes.INTEGER},
	Price_Up_To_100: {type: DataTypes.INTEGER},
	
})

module.exports = Materials;