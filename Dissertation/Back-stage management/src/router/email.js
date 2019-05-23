'use strict';
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
	service: 'qq', 
	port: 465,
	secure: true, // true for 465, false for other ports
	auth: {
		user: "1721019749@qq.com", // 默认邮箱
		pass: 'hygizkgsjvimdabi' // //smtp 授权码
	}
});

function sendmail(mail, msg) {
	return new Promise((resolve, reject) => {
		// console.log(mail);
		let mailOptions = {
			from: '1721019749@qq.com', 
			to: mail,
			subject: '验证码', 
			text: msg 
		};
		transporter.sendMail(mailOptions, (error, info) => {
			if(error) {
				reject(error);
			}
			resolve('ok');
		})
	})
}
// sendmail('1721019749@qq.com','123')
module.exports = {sendmail};
