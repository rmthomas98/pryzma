import clientPromise from '../../lib/mongodb';
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

const handler = async (req, res) => {

  try {
    // get email from frontend
    const email = req.body.email;

    // connect to mongodb
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('users');

    // check if email is in database
    const user = await collection.findOne({email: email});

    // if no user, send response back to front end
    // saying there was no email found in db
    if (!user) return res.status(200).json('user not found')

    // if user in db, create magic link and store it in db
    const magicLink = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const updatedMagicLink = {
      $set: {
        resetPasswordLink: magicLink
      }
    }

    // update user with magic link in db
    await collection.updateOne({email: email}, updatedMagicLink);

    // send email to the email proveded with magic link
    const transporter = nodemailer.createTransport({
      host: 'smtppro.zoho.com',
      port: 587,
      secure: false,
      auth: {
        user: 'rmthomas@pryzma.io',
        pass: process.env.ZOHO_PASSWORD
      }
    })

    // create the message
    const msg = {
      from: '"Pryzma" <noreply@pryzma.io>',
      to: email,
      subject: 'Reset Password',
      html: `<div style="border-radius: 10px; padding: 10px; max-width: 400px; margin: auto; background: #E2E8F0; height: 500px; position: relative;"><p style="font-size: 30px; color:#374151; font-weight: bold; text-align: center;">Pryzma</p><p style="font-size: 16px; color: #374151; text-align: center;">You are recieving this email because you wanted to reset your password at Pryzma. Follow the instructions on the screen after clicking the button below to reset your password.</p><a href="http://localhost:3000/reset-password/token=${magicLink}">reset</a></div>`
    }

    // attempt to send email
    try {
      await transporter.sendMail(msg);
      res.status(200).json('email sent')
    } catch {
      res.status(200).json('something went wrong')
    }

    // catch any errors and send to front end
  } catch (e) {
    res.status(200).json('something went wrong')
  }

}

export default handler;