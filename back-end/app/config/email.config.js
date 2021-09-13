const nodemailer = require('nodemailer');
module.exports = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  ssl: false,
  tls: true,
  auth: {
     user: '373cd88357d0e1',
     pass: '5f038a419ac41b'
  }
});

