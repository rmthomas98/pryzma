import {useReducer, useState} from 'react';
import ChoosePlan from './ChoosePlan';
import AddPayment from './AddPayment';

// reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return {step: state.step + 1};
    case 'decrement':
      return {step: state.step - 1 }
    default:
      return state
  }
}

const SetupSubscription = ({user, accountMessage}) => {

  // keep track of step user is in on sign up form
  const [step, dispatch] = useReducer(reducer, {step: 1});

  // setting price to show customer
  const [price, setPrice] = useState();

  const increment = () => {
    dispatch({type: 'increment'})
  }

  return (
    <div>
    {accountMessage && (
        <div className="absolute top-[100px] left-[50%] translate-x-[-50%] w-fit p-4 pt-6 pb-6 bg-yellow-700 border-2 border-yellow-400 rounded-lg shadow-lg shadow-gray-400">
          <p className="text-xs font-bold text-center text-white leading-5">
            {accountMessage}
          </p>
        </div>
      )}
      {step.step === 1 && <ChoosePlan increment={increment} user={user} setPrice={setPrice}/>}
      {step.step === 2 && <AddPayment user={user} price={price}/>}
    </div>
  )
}

export default SetupSubscription;