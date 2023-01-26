import React from 'react';
import ReactDOM from 'react-dom/client';
import  {Provider}  from "react-redux"
import store from "./newapp/store"
import App from './App';
import reportWebVitals from './reportWebVitals';
import  { fetchUsers } from "./blogfeautures/user/userSlice"
import { BrowserRouter, Routes, Route} from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById('root'));

store.dispatch(fetchUsers())
root.render(
  <React.StrictMode>

    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
       
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
