import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { ordered, restocked } from "./icecreamSlice"

function IcecreamView() {
  const dispatch = useDispatch()

  const [value, setValue] = useState(1)

  const handleChange = (e) => {
    setValue(parseInt(e.target.value))
  }
  const numberOfIceCream = useSelector(state => state.icecream.numberOfIceCream)
  return (
    <div>
       <h2>Number of ice creams - {numberOfIceCream}</h2>
      <button onClick={() => dispatch(ordered())}>Order ice creams</button>
      <input
      type ="number"
      value = {value}
      onChange={handleChange}
      />
      <button onClick={() => dispatch(restocked(value))}>Restock ice creams</button>
    </div>
  )
}

export default IcecreamView