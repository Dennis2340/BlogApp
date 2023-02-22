import React from 'react'
import PostList from "./blogfeautures/post/PostList"
import AddPostForm from "./blogfeautures/post/AddPostForm"
import { Routes, Route } from "react-router-dom"
import Layout from './components/Layout'
import SinglePostPage from './blogfeautures/post/singlePostPage'
import EditPostPage from './blogfeautures/post/EditPostPage'
const App = () => {
  return (
    <>
    <div>
      
    </div>
    <Routes>
      
       <Route path ="/" element={<Layout/>}/>
       <Route index element={<PostList/>} />
       <Route path="post">
        <Route index element={<AddPostForm/>}/>
        <Route path=":postId" element={<SinglePostPage/>}/>
        <Route path ="edit/:postId" element={<EditPostPage/>}/>
       </Route>

   </Routes>

   </>
  )
}

export default App