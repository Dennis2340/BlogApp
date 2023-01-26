import { useDispatch } from "react-redux"
import {reactionAdded} from "./postsSlice"
import React from 'react'
import Button from "@mui/material/Button"

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "🤯",
  heart: "❤",
  rocket: "🚀",
  
}



const ReactionButtons = ({post}) => {

  const dispatch = useDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji])=> {
    return (
      <Button
      key={name}
      type="button"
      variant="outlined"
      size="small"
      className="reactionButton"
      sx={{marginRight: {xs: .6, sm: 3},}}
      onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name}))}
      >
         {emoji}  {post.reactions[name]}
      </Button>
    )
  }) 

  
  return (
    <div>{reactionButtons}</div>
  )
}

export default ReactionButtons