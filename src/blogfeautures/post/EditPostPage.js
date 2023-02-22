import React,{ useState }  from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { getAllUsers, fetchUsers } from "../user/userSlice"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Select from "@mui/material/Select"
import Typography from "@mui/material/Typography"
import MenuItem from "@mui/material/MenuItem"
import SearchAppBar from "../../components/Header"
import { updatePost, deletePost, selectPostById } from "./postsSlice"

const EditPostPage = () => {
   const { postId } = useParams()
   const navigate = useNavigate()

   const post = useSelector(state => selectPostById(state, Number(postId)))
   
  const dispatch = useDispatch()

  const [title, setTitle] = useState(post?.title)
  const [content, setContent] = useState(post?.body)
  const [author, setAuthor] = useState(post?.author)
  const [addRequestStatus, setAddRequestStatus] = useState("idle")
  
  const allUsers = useSelector(getAllUsers)

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
  const authorName = e => setAuthor(e.target.value)

  const canSave = [title, content, author].every(Boolean) && addRequestStatus === "idle"
  
  const onSavedPostCliked = () => {
    if(canSave){
     try{
       setAddRequestStatus("pending")
       dispatch(updatePost({id: post.id,title, body: content, author, reactions: post.reactions})).unwrap()
 
       setTitle("")
       setContent("")
       setAuthor("")
       navigate("/")
       
     }catch(error) {
       console.log("Failed to save the post", error)
     }finally{
       setAddRequestStatus("idle")
     }
    }
  }

  const onDeletePost = () => {
    try{
      setAddRequestStatus("pending")
      dispatch(deletePost({id : post.id})).unwrap()

      setTitle("")
      setContent("")
      setAuthor("")
      navigate(`/post/${postId}`)
    }catch(error){
       console.log(error)
    }
  }
  
  const userOptions = allUsers.map(user => (
    <MenuItem key={user.id} value={user.name}>
      {user.name}
    </MenuItem>
   ))
  return (
    <>
    <SearchAppBar/>
    <section>
    <Box sx={{textAlign: "center", marginTop: 5}}>
     <Typography variant="h3" component="h3">
      Edit Post
     </Typography>
    </Box>
    
      <Box sx={{
        width: "50%",
        display: {xs:"block", sm: "none"},
        marginTop: 5,
        marginLeft: "auto",
        marginRight: "auto"
      }}>
      <div>
      <TextField
        label="Post Title"
        variant="outlined"
        fullWidth={true}
        id="postTitle"
        name="postTitle"
        value={title}
        onChange ={onTitleChanged}
        />
      </div>
      <div style={{marginTop: 40, marginButtom: "none"}}>
      <TextField
        label="Content"
        variant="outlined"
        multiline={true}
        rows={4}
        maxRows={1000}
        fullWidth={true}
        id="postContent"
        name="postContent"
        value={content}
        onChange ={onContentChanged}
        />
      </div>
      <div style={{marginTop: 40}}>
      <Select
      label="Author"
      fullWidth={true}
      value={author} 
      onChange={authorName}   
      >
        <option value=""></option>
        {userOptions}
        
        
      </Select>
      </div>
       <Button 
       variant="contained" 
       sx={{marginTop: 6}}
       fullWidth={true}
       onClick={onSavedPostCliked} 
       disabled={!canSave}
       >
        Save Post
       </Button>
      </Box>

      <Box sx={{
         width: "50%",
        display: {xs:"none", sm: "block"},
        marginTop: 5,
        marginLeft: "auto",
        marginRight: "auto"
       
      }}>
      <div>
      <TextField
        label="Post Title"
        variant="outlined"
        fullWidth={true}
        id="postTitle"
        name="postTitle"
        value={title}
        onChange ={onTitleChanged}
        
        />
      </div>
      
      <div style={{marginTop: 40, marginButtom: "none", }}>
      <TextField
        label="Content"
        variant="outlined"
        multiline={true}
        rows={4}
        maxRows={1000}
        fullWidth={true}
        id="postContent"
        name="postContent"
        value={content}
        onChange ={onContentChanged}
        />
      </div>
      <div style={{marginTop: 40}}>
      <Select
      label="Author"
      fullWidth={true}
      
      value={author} 
      onChange={authorName}
      >
        {userOptions}
        
      </Select>
      </div>
       <Button
       variant="contained" 
       sx={{marginTop: 6}}
       fullWidth={true}
       onClick={onSavedPostCliked} 
       disabled={!canSave}
       >
        Save Post
        </Button>
        <div>
        <Button
       variant="contained"
       color="error" 
       sx={{marginTop: 3}}
       fullWidth={true}
       onClick={onDeletePost} 
       disabled={!canSave}
       >
        Delete Post
        </Button>
        </div>
      </Box>
    </section>
    </>
  )
}

export default EditPostPage