const Users = require('./Users-model');
const Category = require("./Category-model");
const Works = require("./Works-model");
const Pricefactor = require("./PriceFactor-model");
const Need = require("./Need-model");

const Images = require("./Images-model");

//Галерея работ
const ImagesGalleryWorks = require("./ImageGalleryWorks-model");
const GalleryWorks = require("./GalleryWorks-model");

//WORKS

//Одна категория может иметь много разных работа)
Category.hasMany(Works);
Works.belongsTo(Category);

Works.hasMany(Pricefactor);
Pricefactor.belongsTo(Works);

Works.hasMany(Images);
Images.belongsTo(Works);

Works.hasMany(Need);
Need.belongsTo(Works);

Need.hasMany(Need, { as: 'Children', foreignKey: 'parentCategoryId' });
Need.belongsTo(Need, { as: 'Parent', foreignKey: 'parentCategoryId' });


//Галерея работ
GalleryWorks.hasMany(ImagesGalleryWorks);
ImagesGalleryWorks.belongsTo(GalleryWorks);

Works.hasMany(GalleryWorks);
GalleryWorks.belongsTo(Works);

//MATERIALS


module.exports ={
	Users,
	Category,
	Need,
	Works,
	Pricefactor,
	Images,
	GalleryWorks,
	ImagesGalleryWorks
}