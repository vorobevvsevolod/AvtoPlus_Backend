const { where } = require('sequelize');
const ApiError = require('../error/ApiError')
const { Category, Works } = require('../models/models')


class CategoryController {

    async get (req, res, next) {
		try {
			const categoriesMain = await Category.findAll({attributes: ["id","name", "img"]});

            const categoriesArray = await Promise.all(categoriesMain.map(async (categoryMain) => {

                const categorySub = await Works.findAll({attributes: ["id","title"], where: {categoryId: String(categoryMain.id)}})
                const categorySubNew = categorySub.map(catsub => {
                    return {
                        idSub: catsub.id,
                        title: catsub.title
                    }
                })

                console.log("Category")
                return{
                    id: categoryMain.id,
                    name: categoryMain.name,
                    img: categoryMain.img,
                    sub: categorySubNew
                }
            }));
            categoriesArray.sort((a, b) => a.id - b.id);
			return res.json({message: categoriesArray})
			
		}catch (e) {
			return next(ApiError.internal(e.message));
		}
	}
}


module.exports = new CategoryController();