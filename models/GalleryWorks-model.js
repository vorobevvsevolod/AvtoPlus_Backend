const sequelize = require('../DB');
const { DataTypes } = require('sequelize');

const GalleryWorks = sequelize.define('gallery_works', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING},
  subTitle: { type: DataTypes.TEXT},
  scopeWork: { type: DataTypes.TEXT},
  cordX: { type: DataTypes.STRING}, 
  cordY: { type: DataTypes.STRING}, 
});

module.exports = GalleryWorks;
