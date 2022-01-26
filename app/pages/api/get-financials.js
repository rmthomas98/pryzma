const axios = require('axios');

const handler = async (req, res) => {
  // get symbol from front end
  const symbol = req.body.symbol;

  // make api call to iex cloud to get the data
  const response = await axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/financials?token=${process.env.IEX_CLOUD_API_KEY}`);

  // if iex cloud does not have the data
  // get it from twelve data
  if (!Object.entries(response.data).length) {

    // make the call to twelve data to get the data
    const balanceSheet = await axios.get(`https://api.twelvedata.com/balance_sheet?symbol=${symbol}&period=quarterly&apikey=${process.env.TWELVE_DATA_API_KEY}`);
    const cashFlow = await axios.get(`https://api.twelvedata.com/cash_flow?symbol=${symbol}&period=quarterly&apikey=${process.env.TWELVE_DATA_API_KEY}`);

    if (balanceSheet.data.status === 'error' || cashFlow.data.status === 'error') {
      return res.status(200).json('data not available')
    }
    
    return res.status(200).json({message: 'twelve', cashFlow: cashFlow.data, balanceSheet: balanceSheet.data})
  }
  
  // if we get a response from iex cloud
  // send it to front end
  res.status(200).json({message: 'iex', data: response.data})
}

export default handler;