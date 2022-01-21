const bcrypt = require('bcryptjs');
import clientPromise from '../../lib/mongodb';

const handler = async (req, res) => {

  try {
    // get token and new password from front end
    const token = req.body.token;
    const password = req.body.password;

    // connect to mongodb
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('users');

    // see if token exists in db
    const user = await collection.findOne({resetPasswordLink: token});

    // if there is no user with this token
    // send message to front end saying this token does not exist
    if (!user) return res.status(200).json('token not found');

    // if token was found in db
    // update the users password
    const updatedPassword = {
      $set: {
        password: bcrypt.hashSync(password), // users new password
        resetPasswordLink: null // resets the password token 
      }
    }

    // update user in db
    await collection.updateOne({resetPasswordLink: token}, updatedPassword);

    // send success message to frontend
    res.status(200).json('password updated');

  } catch {
    res.status(200).json('something went wrong')
  }

}

export default handler;