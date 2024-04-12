const { Op } = require('sequelize');
const ApiError = require('../error/ApiError')
const {Images, Pricefactor, Need, Materials, Deliverylocation } = require('../models/models');


class MaterialsController {

	async get(req, res, next) {
		try {
			const materials = await Materials.findAll({ where: { parentMaterialId: null } });
	
			const MaterialsArray = await Promise.all(materials.map(async (material) => {
				
				const subMaterials = await Materials.findAll({ where: { parentMaterialId: material.id } });
				const subMaterialImages = await Promise.all(subMaterials.map(async (subMaterial) => {
					return await Images.findAll({ attributes: ["id", "url"], where: { materialId: subMaterial.id } });
				}));
	
				const subMaterialPriceFactors = await Promise.all(subMaterials.map(async (subMaterial) => {
					return await Pricefactor.findAll({ attributes: ["id", "name"], where: { materialId: subMaterial.id } });
				}));
	
				const subMaterialNeedDescs = await Promise.all(subMaterials.map(async (subMaterial) => {
					return await Need.findOne({ where: { materialId: subMaterial.id, parentCategoryId: null } });
				}));

				
	
	
				const subMaterialObjects = await Promise.all(subMaterials.map(async (subMaterial, index) => {
					const materialNeedDesc = subMaterialNeedDescs[index];
					const materialNeedList = materialNeedDesc ? await Need.findAll({ attributes: ["id", "name", "description"], where: { materialId: subMaterial.id, parentCategoryId: materialNeedDesc.id } }) : [];
	
					return {
						...subMaterial.dataValues,
						images: subMaterialImages[index],
						priceFactor: {
							materialId: subMaterial.id,
							list: subMaterialPriceFactors[index]
						},
						need: materialNeedDesc ? {
							title: materialNeedDesc.name,
							description: materialNeedDesc.description,
							materialId: subMaterial.id,
							list: materialNeedList
						} : null
					};
				}));
	
				const materialImages = await Images.findAll({ attributes: ["id", "url"], where: { materialId: material.id } });
				const materialPriceFactor = await Pricefactor.findAll({ attributes: ["id", "name"], where: { materialId: material.id } });
				const materialNeedDesc = await Need.findOne({ where: { materialId: material.id, parentCategoryId: null } });
	
				if (materialNeedDesc) {
					const materialNeedList = await Need.findAll({ attributes: ["id", "name", "description"], where: { materialId: material.id, parentCategoryId: materialNeedDesc.id } });
					return {
						...material.dataValues,
						images: materialImages,
						priceFactor: {
							materialId: material.id,
							list: materialPriceFactor
						},
						need: {
							title: materialNeedDesc.name,
							description: materialNeedDesc.description,
							materialId: material.id,
							list: materialNeedList
						},
						sub: subMaterialObjects
					};
				} else {
					return {
						...material.dataValues,
						images: materialImages,
						priceFactor: {
							materialId: material.id,
							list: materialPriceFactor
						},
						sub: subMaterialObjects
					};
				}
			}));
	
			return res.json({ message: MaterialsArray });
		} catch (e) {
			return next(ApiError.internal(e.message));
		}
	}
	
	
}


module.exports = new MaterialsController();