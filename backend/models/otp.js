const mongoose = require('mongoose');
const mailSender = require('../mail/mailSender');
const emailTemplate = require('../mail/verifcationTemplate'); 

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
    expires: 60 * 5,
  },
});

async function sendVerificationEmail(email, otp) {
  console.log('in send verification email');
  try {

    await mailSender(email, 'verification Email', emailTemplate(otp));
    console.log('email sent successfully');
  } catch (err) {
    console.log('error in sending email');
  }
}

// Send email after a new document is created
OTPSchema.post('save', async function () {
  console.log('send email after new document created');
  if (this.isNew) {
    console.log('email sent');
    await sendVerificationEmail(this.email, this.otp);
  
  }
  console.log(this.email, this.otp);
});

module.exports = mongoose.model('otp', OTPSchema);
