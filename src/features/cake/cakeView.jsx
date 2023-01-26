import React from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { ordered, restocked } from './cakeSlice'

function CakeView() {
  const dispatch = useDispatch()

  const numberOfCakes = useSelector(state => state.cake.numberOfCakes)
  return (
    <div>
      <h2>Number of cakes - {numberOfCakes}</h2>
      <button onClick={() => dispatch(ordered())}>Order cake</button>
      <button onClick={() => dispatch(restocked(4))}>Restock cake</button>
    </div>
  )
}

export default CakeView