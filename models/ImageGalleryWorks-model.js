const sequalize = require('../DB')
const { DataTypes } = require('sequelize')

const ImagesGalleryWorks = sequalize.define('images_gallery_works', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	url: {type: DataTypes.STRING}
})

module.exports = ImagesGalleryWorks;