import clientPromise from "../../lib/mongodb";

const handler = async (req, res) => {
  try {
    // get user email and updated watch list
    const email = req.body.email;
    const watchlist = req.body.updatedWatchlist;

    // connect to mongodb
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('users');

    const updatedWatchList = {
      $set: {
        watchlist: watchlist
      }
    }

    // update user
    await collection.updateOne({email: email}, updatedWatchList)
    
    res.status(200).json('watchlist updated')

  } catch (e) {
    res.status(400).json(e)
  }
}

export default handler;