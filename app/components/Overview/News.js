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

  if (isLoading || !data) return <div>news loading</div>;

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
      <div className="rounded-md shadow-lg shadow-gray-400/50 overflow-hidden">
        <p className="items-center flex p-3 bg-gray-800 pl-4 pr-4 text-sm text-gray-100 sticky top-0">
          <Image src={newsImage} height={20} width={20} />
          <span className="ml-3">Latest News</span>
        </p>
        <div>
          {data.map((element, index) => {
            return (
              <a
                target="_blank"
                rel="noreferrer"
                href={element.qmUrl}
                className="flex items-center p-4 hover:bg-gray-200 transition duration-300"
                key={index}
              >
                <div className="w-full max-w-[140px] min-w-[140px] mr-4 rounded-md overflow-hidden h-[90px]">
                  <Image
                    src={element.image}
                    height={90}
                    width={140}
                    loading="lazy"
                    layout="fixed"
                    quality={20}
                  />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-lg mb-2">
                    {element.headline}
                  </p>
                  <div className="flex">
                    <p className="text-xs text-gray-600 mr-4">
                      {element.source}
                    </p>
                    <p className="text-xs text-gray-600">
                      {format(new Date(element.datetime), "MMMM dd, h:mm aa")}
                    </p>
                  </div>
                  <p className="text-sm text-gray-800 mt-2 line-clamp-2">
                    {element.summary}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default News;
