import clientPromise from '../../lib/mongodb';

const handler = async (req, res) => {
  

  try {
    // get values from front end
    const symbol = req.body.symbol;
    const action = req.body.action;
    const email = req.body.email;
    let watchlist;

    // connect to mongodb
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('users');

    // get user from mongodb
    const user = await collection.findOne({email: email});

    // update watchlist
    if (action === 'add') {
      // add symbol to current watchlist
      watchlist = [...user.watchlist, symbol];
    } else {
      // remove symbol from watchlist
      const newWatchlist = user.watchlist
      const index = newWatchlist.indexOf(symbol);
      newWatchlist.splice(index, 1)
      watchlist = newWatchlist;
    }

    // create new watchlist update to update in mongodb
    const updatedWatchlist = {
      $set: {
        watchlist: watchlist
      }
    }

    // update user in mongodb
    await collection.updateOne({email: email}, updatedWatchlist)

    // get updated user to send back to frontend
    const newUser = await collection.findOne({email: email});

    // send response back to frontend
    res.status(200).json(newUser)

  } catch {
    res.status(200).json('something went wrong')
  }

}

export default handler;