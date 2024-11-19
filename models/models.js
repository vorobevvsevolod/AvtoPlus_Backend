const Users = require('./Users-model');
const Category = require("./Category-model");
const Works = require("./Works-model");
const Pricefactor = require("./PriceFactor-model");
const Need = require("./Need-model");
const TypesOfServices = require("./TypesOfServices-model");

const Images = require("./Images-model");
const Materials = require("./Materials-model");

const Deliverylocation = require("./DeliveryLocations-model");
const MaterialFromLocation = require("./MaterialFromLocation-model");


//Галерея работ
const ImagesGalleryWorks = require("./ImageGalleryWorks-model");
const GalleryWorks = require("./GalleryWorks-model");


TypesOfServices.hasMany(Category);
Category.belongsTo(TypesOfServices);

//WORKS
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
Category.hasMany(Materials);
Materials.belongsTo(Category);

Materials.hasMany(Pricefactor);
Pricefactor.belongsTo(Materials);

Materials.hasMany(Images);
Images.belongsTo(Materials);

Materials.hasMany(Need);
Need.belongsTo(Materials);

Materials.hasMany(Materials, { as: 'Children', foreignKey: 'parentMaterialId' });
Materials.belongsTo(Materials, { as: 'Parent', foreignKey: 'parentMaterialId' });

Materials.hasMany(MaterialFromLocation);
MaterialFromLocation.belongsTo(Materials);

Deliverylocation.hasMany(MaterialFromLocation);
MaterialFromLocation.belongsTo(Deliverylocation);


Category.hasMany(MaterialFromLocation);
MaterialFromLocation.belongsTo(Category);

module.exports ={
	Users,
	Category,
	Need,
	Works,
	Pricefactor,
	Images,
	GalleryWorks,
	ImagesGalleryWorks,
	TypesOfServices,
	Materials,
	Deliverylocation,
    MaterialFromLocation,

}