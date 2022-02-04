const axios = require("axios");

const handler = async (req, res) => {
  const direction = req.body.direction;
  const response = await axios.get(
    `https://api.twelvedata.com/market_movers/stocks?direction=${direction}&apikey=${process.env.TWELVE_DATA_API_KEY}`
  );
  res.status(200).json(response.data);
};

export default handler;
