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
    <div className="mt-10 mb-8">
      <p className="p-2 pl-0 text-zinc-200 font-semibold text-xl flex items-center">
        Watchlist Specific News
      </p>
      <div>
        {newsList ? (
          newsList.map((element) => {
            return (
              <div
                className="rounded-md mb-10 overflow-hidden bg-zinc-800"
                key={element[0]}
              >
                <p className="p-3 pl-4 text-zinc-200 font-medium flex justify-between border-b border-zinc-700">
                  {element[0]}
                </p>
                {element[1].news.map((article) => {
                  return (
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center p-4 transition duration-300"
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
                        <p className="text-zinc-100 font-medium text-lg mb-2">
                          {article.headline}
                        </p>
                        <div className="flex">
                          <p className="text-xs text-zinc-400 font-medium mr-4">
                            {article.source}
                          </p>
                          <p className="text-xs text-zinc-400 font-medium">
                            {format(
                              new Date(article.datetime),
                              "MMMM dd, h:mm aa"
                            )}
                          </p>
                        </div>
                        <p className="text-sm text-zinc-300 mt-2 line-clamp-2">
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
