const sequalize = require('../DB')
const { DataTypes } = require('sequelize')

const Deliverylocation = sequalize.define('delivery_locations', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.STRING},
	cordX: { type: DataTypes.STRING}, 
  	cordY: { type: DataTypes.STRING}, 

})

module.exports = Deliverylocation;