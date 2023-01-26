import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import {useEffect} from 'react'
import {getAllPosts, getPostStatus, getPostError, fetchPosts} from "./postsSlice"
import PostAuthor from "./PostAuthor"
import PostExcerpts from "./PostExcerpts" 
import SearchAppBar from "../../components/Header"
import Spinner from "../../components/Spinner"
import Box from "@mui/material/Box"
import AddPostForm from "./AddPostForm"
import Typography from "@mui/material/Typography"
const PostList = () => {
  const dispatch = useDispatch()

 const postsBlog = useSelector(state => state.posts.posts)
 const postStatus = useSelector(getPostStatus)
 const error = useSelector(getPostError)

 useEffect(() => {
  if(postStatus === "idle"){
    dispatch(fetchPosts())
  }
 }, [postStatus, dispatch])

 let content;
 if (postStatus === "loading") {
  return  (
  <Box sx={{marginLeft: 10, marginRight: "auto",}}>
  <Spinner/>
  </Box>
 )
 }else if (postStatus === "succeeded") {
  const orderedPosts = postsBlog.slice().sort((a,b) => b.date.localeCompare(a.date))
  content = orderedPosts.map(post => <PostExcerpts key={post.id} post={post}/>)
 }else if (postStatus === "failed") {
  content = <p>{error}</p>
 }

 return (
  <>
   
    <SearchAppBar/>
    
  <Box sx={{textAlign: "center", justifyContent: "center"}}> 
  <section>
    <Typography sx={{marginTop: 4,}}  variant="h4" component="h1">Posts</Typography>
   
   
    
    <Box sx={{marginTop: 2, textAlign: "center", marginLeft: "auto", marginRight: "auto",}}>
    {content}
    
    </Box>
  </section>
  <Box sx={{marginLeft: "auto", marginRight: 0, display: {xs: "block", sm: "none"}}}>
  <Spinner/>
  </Box>
  </Box>
  
  </>
 )
}

export default PostList