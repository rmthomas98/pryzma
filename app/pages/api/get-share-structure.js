const axios = require("axios");

const handler = async (req, res) => {
  // get symbol from frontend
  const symbol = req.body.symbol;

  // make call to get share structure data
  const response = await axios.get(
    `https://api.twelvedata.com/statistics?symbol=${symbol}&apikey=${process.env.TWELVE_DATA_API_KEY}`
  );

  // check whether the response found the symbol
  if (response.data.status === "error") {
    // if the twelve data api has an error
    // we make an api call to IEX instead to get the data
    const backupResponse = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${symbol}/stats?token=${process.env.IEX_CLOUD_API_KEY}`
    );
    return res.status(200).json({
      marketCap: backupResponse.data.marketcap,
      sharesOutstanding: backupResponse.data.sharesOutstanding,
      message: "iex",
    });
  } else {
    // if twelve data api responds with stat data
    // we send the information back to front end
    // and we create an object with only the wanted data
    const customData = {
      stats: response.data.statistics.stock_statistics,
      marketCap: response.data.statistics.valuations_metrics,
      message: "twelve",
    };
    return res.status(200).json(customData);
  }
};

export default handler;
