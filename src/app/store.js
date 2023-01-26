import { configureStore } from "@reduxjs/toolkit"
import cakeReducer from "../features/cake/cakeSlice"
import icecreamReducer from "../features/icecream/icecreamSlice"
import userReducer from "../features/users/userSlice"
// const reduxLogger = require("redux-logger")
// const logger = reduxLogger.createLogger()

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    icecream: icecreamReducer,
    user: userReducer
  },
   //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat() 
})

export default store