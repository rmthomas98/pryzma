import {Search as MagnifyGlass} from 'react-bootstrap-icons'
import { useRouter } from 'next/router';

const Search = () => {

  const router = useRouter();

  return (
    <div className=' w-1/2 max-w-lg'>
    <form className='w-full max-w-lg relative'>
    <input type="text" placeholder="Search Symbol or Company Name..." className="text-sm p-2 w-full transition-all border-white border-2 font-medium text-gray-700 focus:border-indigo-400 duration-300 rounded-md outline-none pr-10"/>
    <button type='submit'><MagnifyGlass className='text-gray-500 absolute right-4 bottom-2.5 z-10 text-xl'/></button>
    </form>
    </div>
  )
}

export default Search;