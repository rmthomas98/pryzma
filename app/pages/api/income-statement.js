const axios = require("axios");

const handler = async (req, res) => {
  // get symbol from front end
  const symbol = req.body.symbol;

  // make api call to iex cloud
  const response = await axios.get(
    `https://api.twelvedata.com/income_statement?symbol=${symbol}&period=annual&apikey=${process.env.TWELVE_DATA_API_KEY}`
  );

  return res.status(200).json(response.data);
};

export default handler;
