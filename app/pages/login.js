import {useRouter} from 'next/router';

const Login = () => {
  const router = useRouter();
  const newAccount = router.query.newAccount;
  console.log(newAccount)

  return <div>login here</div>
}

export default Login;
