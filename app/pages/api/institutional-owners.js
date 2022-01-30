const axios = require("axios");

const handler = async (req, res) => {
  const symbol = req.body.symbol;

  const response = await axios.get(
    `https://cloud.iexapis.com/stable/stock/${symbol}/institutional-ownership?token=${process.env.IEX_CLOUD_API_KEY}`
  );

  res.status(200).json(response.data);
};

export default handler;
