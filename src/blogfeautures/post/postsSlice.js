import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { sub } from "date-fns"
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts"


// const initialState = [
//   {id: "1", 
//   title: "Learning Redux Toolkit", 
//   content: "I've heard good things.",
//   date: sub(new Date(), { minutes: 10}).toISOString(),
//   reactions: {
//     thumbsUp: 0,
//     wow: 0,
//     heart: 0,
//     rocket: 0,
//     coffee: 0,
//   }
// },
//   {id: "2", 
//   title: "Slice", 
//   content: "The more i say slice, the more i want pizza.",
//   date: sub(new Date(), { minutes: 5}).toISOString(),
//   reactions: {
//     thumbsUp: 0,
//     wow: 0,
//     heart: 0,
//     rocket: 0,
//     coffee: 0,
//   }
// },
// ]

const initialState = {
  posts: [],
  status: "idle", // idle | loading | succeeded| failed
  error: null
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async() => {
  const response = await axios.get(POSTS_URL)
  return response.data
})

export const addNewPost = createAsyncThunk("posts/addNewPost", async(initialPost) => {
 try{
  const response = await axios.post(POSTS_URL, initialPost)
  return response.data
 }catch(error){
  return error.message
 }
})

export const updatePost = createAsyncThunk("posts/updatePost", async(initialPost) => {
   const { id } = initialPost
   try{
     const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
     return response.data
   }catch(error){
    return error.message
   }
  
})

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
        postAdded: {
          reducer: (state,action)  => {
            state.posts.push(action.payload)
          },
          prepare:(title, content, userId, author) =>{
            return { 
              payload: {
                id: nanoid(),
                title,
                content,
                date: new Date().toISOString(),
                userId,
                author,
                reactions: {
                  thumbsUp: 0,
                  wow: 0,
                  heart: 0,
                  rocket: 0,
                  
                }
              }
            }
          }
        },
        reactionAdded(state,action) {
           const { postId, reaction } = action.payload
           const existingPost = state.posts.find(post => post.id === postId)
           if(existingPost){
            existingPost.reactions[reaction]++
           }
        },
      
  },
  extraReducers(builder) {
    builder
       .addCase(fetchPosts.pending, (state,action) => {
        state.status = "loading"
       })
       .addCase(fetchPosts.fulfilled, (state,action) => {
        state.status = "succeeded"
        // Adding data and reactions
        let min = 1
        const loadedPosts = action.payload.map(post => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString()
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            
          }
          return post
        })

          // Add any fetched posts to the array
           state.posts = state.posts.concat(loadedPosts)
       })
       .addCase(fetchPosts.rejected, (state,action) => {
        state.status = "failed"
        state.error = action.error.payload
       })
       .addCase(addNewPost.fulfilled, (state,action) => {
        // these properties deos not present in the api so we push them
         action.payload.userId = Number(action.payload.userId)
         action.payload.date = new Date().toISOString()
         action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
         
         }
         console.log(action.payload)
         state.posts.push(action.payload)
       })
       .addCase(updatePost.fulfilled, (state, action) => {
        if(!action.payload?.id){
          console.log("Update could not compare")
          console.log(action.payload)
          return
        }

        const { id } = action.payload
        action.payload.date= new Date().toISOString()
        const posts = state.filter(post => post.id !== id)
        state.posts = [...posts, action.payload]
       })

     
  }
})

export const getAllPosts = (state) =>  {
  return state.posts.posts
}
export const getPostStatus = (state) => state.posts.status
export const getPostError = (state) => state.posts.error
export const selectPostById = ((state, postId) => state.posts.posts.find(post => post.id === postId)) 
export default postSlice.reducer

export const { postAdded, reactionAdded } = postSlice.actions