import clientPromise from '../../lib/mongodb';
const nodemailer = require('nodemailer');

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

    // if there is a user in the database
    // send email to the email proveded with password reset link
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rmthomas@prizmpro.io',
        pass: 'ayybgrccsebztvlp'
      }
    })

    const msg = {
      from: 'noreply@prizmpro.io',
      to: email,
      subject: 'Reset Password',
      html: '<div style="border-radius: 10px; padding: 10px; max-width: 500px; margin: auto;"><p>password rest</p></div>'
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