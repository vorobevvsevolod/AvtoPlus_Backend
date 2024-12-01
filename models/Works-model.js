const sequalize = require('../DB')
const { DataTypes } = require('sequelize')

const Works = sequalize.define('works', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	title: {type: DataTypes.TEXT},
	descriptionTitle: {type: DataTypes.TEXT},
	description: {type: DataTypes.TEXT},
	lastYear: {type: DataTypes.TEXT},
	features: {type: DataTypes.TEXT},
	slogan: {type: DataTypes.TEXT},
	price: {type: DataTypes.TEXT},
	priceDescription: {type: DataTypes.TEXT},
	url: {type: DataTypes.STRING},
	seoTitle: {type: DataTypes.TEXT},
	seoDescription: {type: DataTypes.TEXT},
	
})

module.exports = Works;