import axios from "axios";

const handler = async (req, res) => {
  // get symbol from frontend
  const symbol = req.body.symbol;

  // make api call to iex cloud to get news data
  const response = await axios.get(
    `https://cloud.iexapis.com/stable/stock/${symbol}/news/10?token=${process.env.IEX_CLOUD_API_KEY}`
  );

  if (response.data.length) {
    return res.status(200).json(response.data);
  }

  // if there is no data in the response
  res.status(200).json("no data available");
};

export default handler;
