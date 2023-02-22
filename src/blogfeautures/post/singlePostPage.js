import { useSelector } from "react-redux"
import { selectPostById } from "./postsSlice"
import React from 'react'
import TimeAgo from "./TimeAgo"
import ReactionButtons from "./ReactionButtons"
import { useParams, Link } from "react-router-dom"
import SearchAppBar from "../../components/Header"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"

const SinglePostPage = () => {

  // retrieve postId
  const { postId } = useParams()
   
  const post = useSelector(state => selectPostById(state, Number(postId)))

  if(!post){
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    )
  }
  return (
    <>
    <SearchAppBar/>
    <Box sx={{marginTop: 7, textAlign: "center", justifyContent: "center"}}>
     <Card variant="outlined" sx={{marginBottom: 7, width: "75%", marginLeft: "auto", marginRight: "auto"}}>
     <Typography variant="h7" component="h3" sx={{marginBottom: 2, marginTop:2}}>{post.title}</Typography>
    <Typography variant="body1">{post.body.substring(0,100)}</Typography>
    <p>
      
      {post.author? `by ${post.author}`: "unknown author"}
      <span style={{marginLeft: 20}}>
        <TimeAgo timestamp={post.date}/>
      </span>

      <span style={{marginLeft: 15}}>
      <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
      </span>
    </p>
    <Box sx={{marginBottom: 2, marginTop: 4}}>
    <ReactionButtons  post={post}/>
    </Box>
     </Card>
  </Box>
   
  </>
  )
}

export default SinglePostPage