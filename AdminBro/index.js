const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroSequelize = require('@admin-bro/sequelize')

AdminBro.registerAdapter(AdminBroSequelize)
const sequelize = require('../DB')

const adminBro = new AdminBro({
	databases: [sequelize],
	rootPath: '/admin',
})


const adminRouter = AdminBroExpress.buildRouter(adminBro)

module.exports = adminRouter