const { where } = require('sequelize');
const ApiError = require('../error/ApiError')
const { Works, Images, Pricefactor, Need } = require('../models/models');


class WorksController {

    async get (req, res, next) {
		try {
			const works = await Works.findAll();

			const WorksArray = await Promise.all(works.map(async (work) => {

                const workImages = await Images.findAll({where: {workId: work.id}})
                const workPriceFactor = await Pricefactor.findAll({where: {workId: work.id}})
				const workNeedDesc = await Need.findOne({where: {workId: work.id, parentCategoryId: null}})
				const workNeedList = await Need.findAll({where: {workId: work.id, parentCategoryId: workNeedDesc.id}})

                return{
                    ...work.dataValues,
                    images: workImages,
					priceFactor: workPriceFactor,
					need:{
						title: workNeedDesc.name,
						description: workNeedDesc.description,
						list: workNeedList
					}
                }
            }));
	
			return res.json({message: WorksArray})
		}catch (e) {
			return next(ApiError.internal(e.message));
		}
	}
}


module.exports = new WorksController();