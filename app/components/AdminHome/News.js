import Image from "next/image";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const News = ({ news, watchListSymbols }) => {
  const [newsList, setNewsList] = useState(news);

  useEffect(() => {
    if (!watchListSymbols) return setNewsList();
  }, [watchListSymbols]);

  if (!newsList) return "";

  return (
    <div className="mt-10 mb-8">
      <p className="p-2 pl-0 text-zinc-200 font-semibold text-xl flex items-center">
        Watchlist Specific News
      </p>
      {newsList.data
        ? newsList.data.map((element, index) => {
            return (
              <a
                href={element.news_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center cursor-pointer mb-2 rounded-md p-2 hover:bg-zinc-800 transition-all duration-300"
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
  );
};

export default News;
