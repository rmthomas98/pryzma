import Image from "next/image";
import newsImage from "../../static/images/news.svg";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const News = ({ news, watchListSymbols }) => {
  const [newsList, setNewsList] = useState(news && Object.entries(news));

  useEffect(() => {
    if (!watchListSymbols) return setNewsList();
  }, [watchListSymbols]);

  return (
    <div className="mt-8 mb-8">
      <p className="p-4 pl-0 text-gray-800 font-semibold text-xl flex items-center">
        <Image src={newsImage} height={30} width={30} />
        <span className="ml-4">Watchlist Specific News</span>
      </p>
      <div>
        {newsList ? (
          newsList.map((element) => {
            return (
              <div
                className="shadow-lg rounded-md shadow-gray-400/50 mb-10 overflow-hidden bg-gray-50"
                key={element[0]}
              >
                <p className="p-3 pl-4 bg-gray-800 text-gray-100 font-medium flex justify-between">
                  Symbol - {element[0]}
                </p>
                {element[1].news.map((article) => {
                  return (
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center p-4 hover:bg-gray-200 transition duration-300"
                      key={article.datetime}
                    >
                      <div className="w-full max-w-[140px] min-w-[140px] mr-4 rounded-md overflow-hidden h-[90px]">
                        <Image
                          src={article.image}
                          height={90}
                          width={140}
                          loading="lazy"
                          layout="fixed"
                          quality={20}
                        />
                      </div>
                      <div>
                        <p className="text-gray-900 font-semibold text-lg mb-2">
                          {article.headline}
                        </p>
                        <div className="flex">
                          <p className="text-xs text-gray-600 mr-4">
                            {article.source}
                          </p>
                          <p className="text-xs text-gray-600">
                            {format(
                              new Date(article.datetime),
                              "MMMM dd, h:mm aa"
                            )}
                          </p>
                        </div>
                        <p className="text-sm text-gray-800 mt-2 line-clamp-2">
                          {article.summary}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            );
          })
        ) : (
          <div className="overflow-hidden rounded-md shadow-lg shadow-gray-400/50">
            <p className="p-3 pl-4 bg-gray-800 text-gray-100 text-sm">
              Symbol News
            </p>
            <p className="p-8 text-center text-gray-700 leading-7">
              Add stocks to your watchlist to see symbol specific news.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
