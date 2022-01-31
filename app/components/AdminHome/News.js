import Image from "next/image";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const News = ({ news, watchListSymbols }) => {
  const [newsList, setNewsList] = useState(news);

  console.log(newsList);

  useEffect(() => {
    if (!watchListSymbols) return setNewsList();
  }, [watchListSymbols]);

  return (
    <div className="mt-10 mb-8">
      <p className="p-2 pl-0 text-zinc-200 font-semibold text-xl flex items-center">
        Watchlist Specific News
      </p>
        {newsList.data
          ? newsList.data.map((element, index) => {
              return (
                <div className="flex items-center mb-4 bg-zinc-800 p-3 rounded-md" key={index}>
                  <div className="rounded-md max-h-[90px] max-w-[140px] min-w-[140px] overflow-hidden">
                    <Image
                      src={element.image_url}
                      height={90}
                      width={140}
                      loading="lazy"
                      layout="fixed"
                      quality={20}
                    />
                  </div>
                  <div className="ml-4">
                    <p className={`text-xs mb-2 font-medium w-fit px-1 py-0.5 rounded-md bg-gradient-to-br ${element.sentiment === 'Positive' && 'from-green-400 to-green-600 text-black'} ${element.sentiment === 'Neutral' && 'from-amber-400 to-amber-600 text-black'} ${element.sentiment === 'Negative' && 'from-red-400 to-red-600 text-black'}`}>{element.sentiment}</p>
                    <p className="text-zinc-100 font-medium line-clamp-2">{element.text}</p>
                    <div className="flex">
                      <p className="text-zinc-300 text-xs mr-4">{element.source_name}</p>
                      <p className="text-zinc-300 text-xs">{format(new Date(Date.parse(element.date)), "MMMM dd, h:mm aa")}</p>
                    </div>
                  </div>
                </div>
              );
            })
          : "There is no news available."}
    </div>
  );
};

export default News;
