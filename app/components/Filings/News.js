import {format} from 'date-fns';

const News = ({data}) => {
  return (
  <div className="w-full rounded-md shadow-lg shadow-gray-400 overflow-auto max-h-[275px] scrollbar-hide">
    <p className="p-3 bg-gray-800 pl-4 pr-4 text-sm text-gray-100 sticky top-0">
          News
        </p>
    {data.map((element, index) => {
      if (element.type !== '8-K' && element.type !== '6-K') return
      return (
        <a href={element.finalLink} target="_blank" rel="noreferrer" key={index} className="flex px-4 p-2 border-b border-gray-200">
        <p className="w-full text-xs font-semibold text-violet-600">{element.type}</p>
        <p className="w-full text-xs text-gray-900 font-medium text-center">News Report</p>
        <p className="w-full text-right text-xs text-gray-900 font-medium">{format(new Date(element.fillingDate), "MMMM dd, yyyy")}</p>
        </a>
      )
    })}
  </div>
  )
}

export default News;