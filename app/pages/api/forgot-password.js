import clientPromise from "../../lib/mongodb";
const nodemailer = require("nodemailer");

const handler = async (req, res) => {
  try {
    // get email from frontend
    const email = req.body.email;

    // connect to mongodb
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("users");

    // check if email is in database
    const user = await collection.findOne({ email: email });
    // if no user, send response back to front end
    // saying there was no email found in db
    if (!user) return res.status(200).json("user not found");

    // get name from user for email
    const name = `${user.firstName} ${user.lastName}`;

    // if user in db, create magic link and store it in db
    const magicLink =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    const updatedMagicLink = {
      $set: {
        resetPasswordLink: magicLink,
      },
    };

    // update user with magic link in db
    await collection.updateOne({ email: email }, updatedMagicLink);

    // send email to the email proveded with magic link
    const transporter = nodemailer.createTransport({
      host: "smtppro.zoho.com",
      port: 587,
      secure: false,
      auth: {
        user: "rmthomas@pryzma.io",
        pass: process.env.ZOHO_PASSWORD,
      },
    });

    // create the message
    const msg = {
      from: '"Pryzma" <noreply@pryzma.io>',
      to: email,
      subject: "Reset Password",
      html: `<body style="margin: 0; padding: 0;"><div style="background: #f1f5f9; padding-top: 30px; padding-bottom: 30px; padding-right: 16px; padding-left: 16px;"><div style="background: #fff; border-radius: 10px; padding: 24px; max-width: 440px; margin: auto;"><p style="margin-top: 10px; font-size: 22px; color:#374151; font-weight: bold; text-align: center;">Reset Password</p><p style="font-size: 14px; color: #6b7280;">Dear ${name},</p><p style="font-size: 14px; color: #6b7280; margin-bottom: 50px;">You are receiving this email because we received a password reset request for your account. If you did not request a password reset, no further action is required.</p><div style="height:50px; text-align:center;"><a style="padding: 14px 40px; font-size: 14px; border-radius: 10px; background: #4f46e5; color: #ffffff; text-decoration: none;" href="http://localhost:3000/reset-password/${magicLink}">Reset Password</a></div><p style="font-size: 14px; color: #6b7280;">Thanks,</p><p style="font-size: 14px; color: #6b7280;">The Pryzma Team</p></div></div></body>`,
    };

    // attempt to send email
    try {
      await transporter.sendMail(msg);
      res.status(200).json("email sent");
    } catch {
      res.status(200).json("something went wrong");
    }

    // catch any errors and send to front end
  } catch (e) {
    res.status(200).json("something went wrong");
  }
};

export default handler;
