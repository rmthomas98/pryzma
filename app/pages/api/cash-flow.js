const axios = require("axios");

const handler = async (req, res) => {
  // get symbol from front end
  const symbol = req.body.symbol;
  const period = req.body.period;

  // make api call to iex cloud
  const response = await axios.get(
    `https://api.twelvedata.com/cash_flow?symbol=${symbol}&period=${period}&apikey=${process.env.TWELVE_DATA_API_KEY}`
  );

  return res.status(200).json(response.data);
};

export default handler;
