import {format} from 'date-fns'
import { useEffect, useState } from 'react'

const Financials = ({data}) => {

  const [isData, setIsData] = useState(false)

  useEffect(() => {
    setIsData(false)
    const isData = data.map(element => {
      if (element.type === '10-K' || element.type === '10-Q') return element
    })
    if (isData.length) setIsData(true)
  },[data])

  if (!isData) return <div>No data in this section</div>

  return (
  <div className="w-full rounded-md shadow-lg shadow-gray-400 overflow-auto max-h-[275px] scrollbar-hide mr-6">
    <p className="p-3 bg-gray-800 pl-4 pr-4 text-sm text-gray-100 sticky top-0">
          Financials
        </p>
    {data.map((element, index) => {
      if (element.type !== '10-K' && element.type !== '10-Q') return
      return (
        <a href={element.finalLink} target="_blank" rel="noreferrer" key={index} className="flex px-4 p-2 border-b border-gray-200">
        <p className="w-full text-xs font-semibold text-violet-600">{element.type}</p>
        <p className="w-full text-xs text-gray-900 font-medium text-center">{element.type === '10-K' ? 'Annual Report' : 'Quarterly Report'}</p>
        <p className="w-full text-right text-xs text-gray-900 font-medium">{format(new Date(element.fillingDate), "MMMM dd, yyyy")}</p>
        </a>
      )
    })}
  </div>
  )
}

export default Financials;