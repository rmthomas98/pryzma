import {useRouter} from 'next/router';
import { useEffect, useRef } from 'react';

const ResetPassword = () => {
  const router = useRouter();
  const token = useRef();

  useEffect(() => {
    token.current = router.query.secretkey?.split('=')[1];
  }, [router.query.secretkey])

  return <div>reset password<button onClick={() => console.log(token)}>click me</button></div>
}

export default ResetPassword;