const nodemailer = require('nodemailer');

const sendEmail = async (req,res) => {

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "andy.kemmer@ethereal.email",
        pass: "9DmqntWnfrYRrUFzdC",
      },
    });

    let info = await transporter.sendMail({
        from: '"Daniele Lena" <daniele.lena@yahoo.it',
        to: 'daniele.lena@yahoo.it',
        subject: 'hello',
        html: '<h2>Sending emails with node.js</h2>',
    });

    res.json(info);
}


module.exports = sendEmail