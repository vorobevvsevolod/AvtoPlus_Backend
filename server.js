require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const sequelize = require('./DB')
const models = require('./models/models')
const routers = require('./routers/index')
const PORT = process.env.PORT || 5000
const fileUpload = require('express-fileupload')
const errorHandler = require('./middleware/errorHandlerMiddleware')
const adminRouter = require("./AdminBro");

const app = express();
const corsOptions = {
	origin: 'http://188.68.223.158',
	methods: ['GET', 'POST', 'PUT', 'DELETE'], 
	allowedHeaders: ['Content-Type', 'Authorization'], 
  };
  
  app.use(cors(corsOptions));
  app.use(express.json());

 //Фотографии


app.use(express.static(path.resolve(__dirname, 'static/categoryIMG')))
app.use(express.static(path.resolve(__dirname, 'static/GalleryWorks')))
app.use(express.static(path.resolve(__dirname, 'static/WorksIMG')))

app.use('/admin', adminRouter)


app.use(fileUpload({}))
app.use('/api', routers)
app.use(errorHandler)

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
  


const start = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync()
		app.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порту`))
	}catch (e) { console.log(e.message); }
}

start();