const { queryApi } = require("sec-api");

const handler = async (req, res) => {
  // initialize SEC api
  queryApi.setApiKey(process.env.SEC_API_KEY);

  // get symbol from front end
  const symbol = req.body.symbol;

  // create query
  const query = {
    query: {
      query_string: {
        query: `ticker:(${symbol})`,
      },
    },
    from: 0,
    sort: [{ filedAt: { order: "desc" } }],
  };

  // make the call
  const filings = await queryApi.getFilings(query);

  if (filings.filings.length) {
    const filingsList = filings.filings.filter((element) => {
      if (
        element.formType !== "424B1" &&
        element.formType !== "424B2" &&
        element.formType !== "424B3" &&
        element.formType !== "424B4" &&
        element.formType !== "424B5" &&
        element.formType !== "424B7" &&
        element.formType !== "424B8" &&
        element.formType !== "S-3" &&
        element.formType !== "S-3/A" &&
        element.formType !== "F-3" &&
        element.formType !== "F-3/A"
      )
        return;
      return element;
    });

    const filingsFinal = filingsList.map((element) => {
      return {
        formType: element.formType,
        link: element.linkToFilingDetails,
        date: element.filedAt,
        description: element.description,
      };
    });
    return res.status(200).json(filingsFinal);
  }

  return res.status(200).json("data not available");
};

export default handler;
