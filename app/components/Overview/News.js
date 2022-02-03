import axios from "axios";
import { useEffect, useState, useContext } from "react";
import SymbolContext from "../../pages/SymbolContext";
import newsImage from "../../static/images/news.svg";
import Image from "next/image";
import { format } from "date-fns";

const News = ({ isLoading, setNews }) => {
  // get symbol from context
  const { symbol } = useContext(SymbolContext);

  // this state will hold the news data
  // the data that we will map through and display to the user
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      // if there is no symbol return
      if (!symbol) return;

      // reset data
      // reset news
      setData();
      setNews(false);

      // hit backend endpoint to get the news data
      const response = await axios.post("/api/get-news", { symbol: symbol[0] });

      setData(response.data);

      return setNews(true);
    };
    getData();
  }, [symbol]);

  if (isLoading || !data) return <div></div>;

  if (data === "no data available")
    return (
      <div className="mt-8">
        <div className="rounded-md shadow-lg shadow-gray-400/50 overflow-hidden">
          <p className="items-center flex p-3 bg-gray-800 pl-4 pr-4 text-sm text-gray-100 sticky top-0">
            <Image src={newsImage} height={20} width={20} />
            <span className="ml-3">Latest News</span>
          </p>
          <p className="text-xs font-medium text-gray-800 p-6 text-center">
            News is not available for {symbol[0]}.
          </p>
        </div>
      </div>
    );

  return (
    <div className="mt-8 mb-12">
      <div>
        <p className="text-lg font-medium text-zinc-200">Latest News</p>
        {data
          ? data.data.map((element, index) => {
              return (
                <a
                  href={element.news_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center cursor-pointer mb-1 rounded-md min-h-[160px] p-2 hover:bg-zinc-800 transition-all duration-300"
                  key={index}
                >
                  <div className="rounded-md max-h-[128px] max-w-[217px] min-w-[217px] overflow-hidden">
                    <Image
                      src={element.image_url}
                      height={128}
                      width={217}
                      loading="lazy"
                      layout="fixed"
                      quality={75}
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-zinc-100 font-medium line-clamp-2 text-lg">
                      {element.title}
                    </p>
                    <div className="flex my-2 items-center">
                      <p
                        className={`text-xs font-medium w-fit px-1 py-0.5 rounded-md bg-gradient-to-br mr-4 ${
                          element.sentiment === "Positive" &&
                          "from-green-400 to-green-600 text-black"
                        } ${
                          element.sentiment === "Neutral" &&
                          "from-amber-400 to-amber-600 text-black"
                        } ${
                          element.sentiment === "Negative" &&
                          "from-red-400 to-red-600 text-black"
                        }`}
                      >
                        {element.sentiment}
                      </p>
                      <p className="text-zinc-400 text-xs mr-4">
                        {element.source_name}
                      </p>
                      <p className="text-zinc-400 text-xs">
                        {format(
                          new Date(Date.parse(element.date)),
                          "MMMM dd, h:mm aa"
                        )}
                      </p>
                    </div>
                    <p className="text-sm text-zinc-300 line-clamp-2 leading-6">
                      {element.text}
                    </p>
                    <div className="flex mt-2">
                      {element.tickers.map((ticker) => (
                        <p className="uppercase mr-2 text-xs font-medium text-zinc-300 py-1 px-1.5 rounded-md bg-zinc-700">
                          {ticker}
                        </p>
                      ))}
                    </div>
                  </div>
                </a>
              );
            })
          : "There is no news available."}
      </div>
    </div>
  );
};

export default News;
