import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const USERS_URL = "https://jsonplaceholder.typicode.com/users"

const initialState = [
  {id: 0, name: "Dennis Kamara"},
  {id: 1, name: "Philip Kamara"},
  {id: 2, name: "Yainkain Kamara"},
]


export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
try {
  const response = await axios.get(USERS_URL)
   return response.data
} catch (error) {
  return error.message
}
})
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers:{
        userAdded: (state, action) => {
         state.id = nanoid()
        }
        
       
  },
  extraReducers(builder){
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  }
})


 export const {userAdded}  = userSlice.actions
export const getAllUsers = (state) => state.users
export default userSlice.reducer