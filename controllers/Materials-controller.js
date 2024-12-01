const { Op } = require('sequelize');
const ApiError = require('../error/ApiError')
const {Images, Pricefactor, Need, Materials, Deliverylocation, MaterialProperties } = require('../models/models');


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

				const subMaterialProperties = await Promise.all(subMaterials.map(async (subMaterial) => {
					return await MaterialProperties.findOne({ where: { materialId: subMaterial.id} });
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
						materialProperties: {
							materialId: subMaterial.id,
							list: subMaterialProperties[index]
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
				const materialProperties = await MaterialProperties.findAll({ attributes: ["id", "name"], where: { materialId: material.id } });
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
						materialProperties: {
							materialId: material.id,
							list: materialProperties
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
						materialProperties: {
							materialId: material.id,
							list: materialProperties
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

	async getById(req, res, next) {
		try {
			const { id } = req.params;
	
			// Получаем основной материал по id
			const material = await Materials.findOne({ where: { id, parentMaterialId: null } });
			if (!material) {
				return res.status(404).json({ message: 'Material not found' });
			}
	
			// Получаем подматериалы для основного материала
			const subMaterials = await Materials.findAll({ where: { parentMaterialId: material.id } });
	
			// Собираем данные о подматериалах, включая изображения, ценовые факторы и потребности
			const subMaterialObjects = await Promise.all(subMaterials.map(async (subMaterial) => {
				const images = await Images.findAll({ attributes: ["id", "url"], where: { materialId: subMaterial.id } });
				const priceFactors = await Pricefactor.findAll({ attributes: ["id", "name"], where: { materialId: subMaterial.id } });
				const needDesc = await Need.findOne({ where: { materialId: subMaterial.id, parentCategoryId: null } });
	
				const needList = needDesc ? await Need.findAll({
					attributes: ["id", "name", "description"],
					where: { materialId: subMaterial.id, parentCategoryId: needDesc.id }
				}) : [];
	
				return {
					...subMaterial.dataValues,
					images,
					priceFactor: {
						materialId: subMaterial.id,
						list: priceFactors
					},
					need: needDesc ? {
						title: needDesc.name,
						description: needDesc.description,
						materialId: subMaterial.id,
						list: needList
					} : null
				};
			}));
	
			// Получаем изображения, ценовые факторы и потребности для основного материала
			const materialImages = await Images.findAll({ attributes: ["id", "url"], where: { materialId: material.id } });
			const materialPriceFactors = await Pricefactor.findAll({ attributes: ["id", "name"], where: { materialId: material.id } });
			const materialNeedDesc = await Need.findOne({ where: { materialId: material.id, parentCategoryId: null } });
	
			const materialNeedList = materialNeedDesc ? await Need.findAll({
				attributes: ["id", "name", "description"],
				where: { materialId: material.id, parentCategoryId: materialNeedDesc.id }
			}) : [];
	
			const result = {
				...material.dataValues,
				images: materialImages,
				priceFactor: {
					materialId: material.id,
					list: materialPriceFactors
				},
				need: materialNeedDesc ? {
					title: materialNeedDesc.name,
					description: materialNeedDesc.description,
					materialId: material.id,
					list: materialNeedList
				} : null,
				sub: subMaterialObjects
			};
	
			return res.json(result);
		} catch (e) {
			return next(ApiError.internal(e.message));
		}
	}
	
	
	
}


module.exports = new MaterialsController();