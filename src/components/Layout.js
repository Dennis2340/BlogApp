import { Outlet} from "react-router-dom"
import React from 'react'
import SearchAppBar from "./Header"
const Layout = () => {
  return (
    <>
      <SearchAppBar/> 
      <Outlet/>
      
    </>
  )
}

export default Layout