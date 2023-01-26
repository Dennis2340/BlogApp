import { configureStore} from "@reduxjs/toolkit"
import postReducer from "../blogfeautures/post/postsSlice"
import usersReducer from "../blogfeautures/user/userSlice"
 const store = configureStore({
   reducer: {
     
     posts: postReducer,
     users : usersReducer,
   }
})

export default store