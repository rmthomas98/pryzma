import clientPromise from '../../lib/mongodb';
const bcrypt = require('bcryptjs')

const handler = async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;

  try {
    // connect to mongodb
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('users');

    // fetch user from mongodb
    const user = await collection.findOne({email: email});

    // set variable to update
    const updatedPassword = {
      $set: {
        password: bcrypt.hashSync(password)
      }
    }

    // update user password
    await collection.updateOne(user, updatedPassword)

    res.status(200).json('password updated')

  } catch (e) {
    res.status(200).json('something went wrong')
  }
}

export default handler;