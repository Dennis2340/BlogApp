import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux/es/hooks/useDispatch'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { fetchUsers } from './userSlice'

function UserView() {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])
  return (
    <div>
      <h2>List of users</h2>
      {user.loading && <div>Loading...</div>}
      {!user.loading && user.error ? <div>Error: {user.error}</div> : null}
      {!user.loading && user.users.length ? (
        <ul>
          {
            user.users.map(user => (
              <li key = {user.id}>{user.name}</li>
            ))
          }
        </ul>
      ): null}
    </div>
  )
}

export default UserView