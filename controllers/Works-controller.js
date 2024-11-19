const { where } = require('sequelize');
const ApiError = require('../error/ApiError')
const { Works, Images, Pricefactor, Need } = require('../models/models');


class WorksController {

    async getAllTitle (req, res, next) {
		try {
			const works = await Works.findAll();

			const WorksArray = await Promise.all(works.map(async (work) => {

                const workImages = await Images.findAll({attributes:["id","url"], where: {workId: work.id}})
                const workPriceFactor = await Pricefactor.findAll({attributes: ["id", "name"], where: {workId: work.id}})
				const workNeedDesc = await Need.findOne({where: {workId: work.id, parentCategoryId: null}})
				if( workNeedDesc){
					const workNeedList = await Need.findAll( {attributes:["id", "name", "description"], where: {workId: work.id, parentCategoryId: workNeedDesc.id}})
					return{
						...work.dataValues,
						images: workImages,
	
						priceFactor: {
							workId: work.id,
							list: workPriceFactor
						},
						need:{
							title: workNeedDesc.name,
							description: workNeedDesc.description,
							workId: work.id,
							list: workNeedList
						}
					}
				} else return{
					...work.dataValues,
                    images: workImages,
                    priceFactor: {
                        workId: work.id,
                        list: workPriceFactor
                    }
				}
            }));
	
			return res.json({message: WorksArray})
		}catch (e) {
			return next(ApiError.internal(e.message));
		}
	}

	 async  getById(req, res, next) {
		try {
			const { id } = req.params;
			
	
			if (!id) return next(ApiError.badRequest('Нет данных'));
	
	
			const work = await Works.findOne({ where: { id } });
			if (!work) return next(ApiError.badRequest('Нет работы'));

			const workImages = await Images.findAll({ attributes: ["id", "url"], where: { workId: work.id } });
			const workPriceFactor = await Pricefactor.findAll({ attributes: ["id", "name"], where: { workId: work.id } });
			const workNeedDesc = await Need.findOne({ where: { workId: work.id, parentCategoryId: null } });
	

			let responseObject = {
				...work.dataValues,
				images: workImages,
				priceFactor: {
					workId: work.id,
					list: workPriceFactor
				}
			};
	
	
			if (workNeedDesc) {
				const workNeedList = await Need.findAll({
					attributes: ["id", "name", "description"],
					where: { workId: work.id, parentCategoryId: workNeedDesc.id }
				});
	
				responseObject = {
					...responseObject,
					need: {
						title: workNeedDesc.name,
						description: workNeedDesc.description,
						workId: work.id,
						list: workNeedList
					}
				};
			}
	
			return res.json({ message: responseObject });
	
		} catch (e) {
			return next(ApiError.internal(e.message));
		}
	}
}


module.exports = new WorksController();