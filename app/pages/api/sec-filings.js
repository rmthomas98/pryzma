const { queryApi } = require("sec-api");

const handler = async (req, res) => {
  // initialize SEC api
  queryApi.setApiKey(process.env.SEC_API_KEY);

  // get symbol from front end
  const symbol = req.body.symbol;

  // create query
  const query = {
    query: { query_string: { query: `ticker:(${symbol})` } }, // get most recent 10-Q filings
    from: "0", // start with first filing. used for pagination.
    sort: [{ filedAt: { order: "desc" } }], // sort result by filedAt
  };

  // make the call
  const filings = await queryApi.getFilings(query);

  // create the filings list
  if (filings.filings.length) {
    const filingsList = filings.filings.map((element) => {
      return {
        type: element.formType,
        description: element.description,
        date: element.filedAt,
        link: element.linkToHtml,
      };
    });
    return res.status(200).json(filingsList);
  }

  // if no response, send message noifying front end
  return res.status(200).json("data not available");
};

export default handler;
