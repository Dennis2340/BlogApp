import React from 'react'
import TimeAgo from "./TimeAgo"
import ReactionButtons from "./ReactionButtons"
import { Link } from "react-router-dom"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"

const PostExcerpts = ({post}) => {
  return (
    <Box>
     <Card variant="outlined" sx={{marginBottom: 7, width: "75%", marginLeft: "auto", marginRight: "auto"}}>
     <Typography variant="h7" component="h3" sx={{marginBottom: 2, marginTop:2}}>{post.title}</Typography>
    <Typography variant="body1">{post.body.substring(0,100)}</Typography>
    <p>
      <Link to={`post/${post.id}`}><span style={{marginRight: 10, marginLeft: 10,}}>View Post</span></Link>
      {post.author? `by ${post.author}`: "unknown author"}
      <span style={{marginLeft: 10, marginRight: 10}}>
        <TimeAgo timestamp={post.date}/>
      </span>
    </p>
    <Box sx={{marginBottom: 2, marginTop: 2}}>
    <ReactionButtons  post={post}/>
    </Box>
     </Card>
  </Box>
  )
}

export default PostExcerpts