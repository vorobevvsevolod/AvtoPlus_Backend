const nodemailer = require('nodemailer');
module.exports = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true,
    auth: {
        user: "diepioRegistarion@yandex.ru",
        pass: "diep31122003"
    }
});