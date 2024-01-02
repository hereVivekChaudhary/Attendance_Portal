const mongoose = require('mongoose');
const mailSender=require("../mail/mailSender");
const emailTemplate=require("../mail/emailTemplate");
const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
	},
});

async function sendVerificationEmail(email, otp) {
    try{
await mailSender(email,"verifcation Email",emailTemplate(otp));
console.log("email sent successfully");
    }catch(err){
        console.log("error in sending email");
    }
}
// send email after new document created
OTPSchema.post('save', async function () {
    console.log('send email after new document created');
if(this.isNew){
await sendVerificationEmail(this.email, this.otp);
}
});
module.exports = mongoose.model('otp', OTPSchema);