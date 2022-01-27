import axios from 'axios';

const handler = async (req, res) => {

  // get symbol from front end
  const symbol = req.body.symbol;

  // make api call to modeling prep to get sec file data
  const response = await axios.get(`https://financialmodelingprep.com/api/v3/sec_filings/${symbol}?page=0&apikey=${process.env.FINANCIAL_PREP_API_KEY}`)
  
  console.log(response.data)
  // check if there is any data in the response
  if (response.data.length) {
    // send the data to the front end
    return res.status(200).json(response.data)
  }

  // if no response, send message noifying front end
  return res.status(200).json('data not available')
}

export default handler;