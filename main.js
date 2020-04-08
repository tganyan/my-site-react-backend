const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const cors = require('cors');
const creds = require('./config');

const transport = {
	host: 'smtp.mail.com',
	auth: {
		user: creds.USER,
		pass: creds.PASS
	}
}

const transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
	if (error) {
		console.log(error);
	} else {	
		console.log('Server is ready for messages');
	}
});

router.post('/send', (request, response, next) => {
	const name = request.body.name;
	const email = request.body.email;
	const message = request.body.message;
	const content = `name: ${name} \n email: ${email} \n message: ${message}`;

	const mail = {
		from: name,
		to: 'tganyan@gmail.com',
		subject: 'New message from tyleranyan.com',
		text: content
	};

	transporter.sendMail(mail, (error, data) => {
		if (error) {
			response.json({
				msg: 'fail'
			});
			console.log(error);
		} else {
			response.json({
				msg: 'success'
			});
		}
	});
});

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);
app.listen(4000);
