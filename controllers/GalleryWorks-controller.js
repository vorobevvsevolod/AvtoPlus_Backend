const { where } = require('sequelize');
const ApiError = require('../error/ApiError')
const { GalleryWorks, ImagesGalleryWorks, Works } = require('../models/models')


class GalleryWorksController {

    async get (req, res, next) {
		try {
			const GalleryWorksQuery = await GalleryWorks.findAll();

            const GalleryWorksArray = await Promise.all(GalleryWorksQuery.map(async (galleryWork) => {

                const ImagesGalleryWork = await ImagesGalleryWorks.findAll({attributes: ["id","url"], where: {galleryWorkId: String(galleryWork.id)}})
                const WorkArray = await Works.findOne({attributes: ["categoryId"], where: {id: String(galleryWork.workId)}})
                

                return{
                    ...galleryWork.dataValues,
                    categoryId: WorkArray.categoryId,
                    img: ImagesGalleryWork
                }
            }));

			return res.json({message: GalleryWorksArray})
			
		}catch (e) {
			return next(ApiError.internal(e.message));
		}
	}
}


module.exports = new GalleryWorksController();