const axios = require("axios");

const handler = async (req, res) => {
  // get symbol from front end
  const symbol = req.body.symbol;

  // make api call to iex cloud to get the data
  const response = await axios.get(
    `https://cloud.iexapis.com/stable/stock/${symbol}/financials?period=quarter&token=${process.env.IEX_CLOUD_API_KEY}`
  );

  // if iex cloud does not have the data
  // attempt to get it from financial modeling prep
  if (!Object.entries(response.data).length) {
    // make the call to financial modeling prep
    const prepBalanceSheet = await axios.get(
      `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${symbol}?limit=1&apikey=${process.env.FINANCIAL_PREP_API_KEY}`
    );
    const prepCashFlow = await axios.get(
      `https://financialmodelingprep.com/api/v3/cash-flow-statement/${symbol}?limit=1&apikey=${process.env.FINANCIAL_PREP_API_KEY}`
    );
    const prepIncomeStatement = await axios.get(
      `https://financialmodelingprep.com/api/v3/income-statement/${symbol}?limit=1&apikey=${process.env.FINANCIAL_PREP_API_KEY}`
    );

    // check if the data is good for modeling prep
    // if there, then send the data to front end
    if (
      prepIncomeStatement.data.length &&
      prepCashFlow.data.length &&
      prepBalanceSheet.data.length
    ) {
      return res.status(200).json({
        message: "prep",
        balanceSheet: prepBalanceSheet.data,
        cashFlow: prepCashFlow.data,
        incomeStatement: prepIncomeStatement.data,
      });
    }

    // make the call to twelve data to get the data
    // if financial prep does not have it
    const balanceSheet = await axios.get(
      `https://api.twelvedata.com/balance_sheet?symbol=${symbol}&period=quarterly&apikey=${process.env.TWELVE_DATA_API_KEY}`
    );
    const cashFlow = await axios.get(
      `https://api.twelvedata.com/cash_flow?symbol=${symbol}&period=quarterly&apikey=${process.env.TWELVE_DATA_API_KEY}`
    );

    // checking if twelve data does not have
    // the data and sending it to front end
    // with a message of data not available
    if (
      balanceSheet.data.status === "error" ||
      cashFlow.data.status === "error"
    ) {
      return res.status(200).json("data not available");
    }

    // if twelve data has the data
    // send the data to the front end
    return res.status(200).json({
      message: "twelve",
      cashFlow: cashFlow.data,
      balanceSheet: balanceSheet.data,
    });
  }

  // if we get a response from iex cloud
  // send it to front end
  res.status(200).json({ message: "iex", data: response.data });
};

export default handler;
