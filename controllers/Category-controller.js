const { where } = require('sequelize');
const ApiError = require('../error/ApiError')
const { Category, Works, Materials } = require('../models/models')


class CategoryController {

    async get(req, res, next) {
        try {
            const categoriesMain = await Category.findAll({attributes: ["id", "name", "img", "typeOfServiceId"]});
    
            const categoriesArray = await Promise.all(categoriesMain.map(async (categoryMain) => {
    
                if (categoryMain.typeOfServiceId === 1) {
                    const works = await Works.findAll({attributes: ["id", "title"], where: {categoryId: String(categoryMain.id)}})
                    const categorySubNew = works.map(catsub => {
                        return {
                            idSub: catsub.id,
                            title: catsub.title
                        }
                    })
    
                    return {
                        id: categoryMain.id,
                        name: categoryMain.name,
                        img: categoryMain.img,
                        typeOfServiceId: categoryMain.typeOfServiceId,
                        sub: categorySubNew
                    }
    
                } else if (categoryMain.typeOfServiceId === 2) {
                    const materials = await Materials.findAll({attributes: ["id", "title"], where: {categoryId: String(categoryMain.id)}})
                    const categorySubNew = materials.map(catsub => {
                        return {
                            idSub: catsub.id,
                            title: catsub.title
                        }
                    })
                    return {
                        id: categoryMain.id,
                        name: categoryMain.name,
                        img: categoryMain.img,
                        typeOfServiceId: categoryMain.typeOfServiceId,
                        sub: categorySubNew
                    }
                }
    
            }));
    
            // Удаление пустых элементов из массива
            const filteredCategoriesArray = categoriesArray.filter(category => category);
    
            // Сортировка массива по id
            filteredCategoriesArray.sort((a, b) => a.id - b.id);
    
            return res.json({message: filteredCategoriesArray})
    
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }
    
}


module.exports = new CategoryController();