import {format} from 'date-fns';
import {useEffect, useState} from 'react';

const Time = () => {

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  },[])  

  return <p className='text-xl text-gray-900'>{format(time, "MMMM dd, h:mm:ss aa")}</p>
}

export default Time;