const { where } = require('sequelize');
const ApiError = require('../error/ApiError')
const { Category, Works, Materials, Deliverylocation, MaterialFromLocation } = require('../models/models')


class DeliverylocationController {

    async get(req, res, next) {
        try {
            const locations = await Deliverylocation.findAll();
            const materialFromLocation = await MaterialFromLocation.findAll();
    
        
            return res.json({message:{locations, materialFromLocation} })
    
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }
    
}


module.exports = new DeliverylocationController();