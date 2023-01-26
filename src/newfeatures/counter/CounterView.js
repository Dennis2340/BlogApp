import { useSelector, useDispatch} from "react-redux"
import { increment, decrement, reset, increaseAmount} from "./counterSlice"

import React, {useState} from 'react'

const CounterView = () => {

  const count = useSelector((state) => state.counter.count)
  const dispatch = useDispatch()

  const [amount, setAmount] = useState(0)

  const addNumber = Number(amount) || 0
  const resetAll = () => {
    setAmount(0)
    dispatch(reset)
  }
  return (
    <div>
      <section>
        <p>{count}</p>
        <div>
          <button onClick={() => dispatch(increment())}>Add</button>
          <button onClick={() => dispatch(decrement())}>Reduce</button>
        </div>
        <div>
          <input type="text"  value={amount} onChange={(e) => setAmount(e.target.value)}/>
        </div>
        <div>
          <button onClick={() => dispatch(increaseAmount(addNumber))}>Adding by {amount}</button>
          <button onClick={() => resetAll()}>Reset</button>
        </div>
      </section>

    </div>
  )
}

export default CounterView