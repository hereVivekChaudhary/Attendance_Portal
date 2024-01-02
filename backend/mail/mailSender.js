const nodemailer = require('nodemailer');   

const mailSender = async (to,subject,text) => {
    try{
        const transporter = nodemailer.createTransport({
            service: process.env.SERVICE,
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
            }
          });
          const mailOptions = {
            from:'CodingWorld - by vineet',
            to: to,
            subject: subject,
            text: text
          };
          const mailResponse=await transporter.sendMail(mailOptions);
          return mailResponse;
    }catch(err){
        console.log("error in sending email");
    }
}
module.exports = mailSender;