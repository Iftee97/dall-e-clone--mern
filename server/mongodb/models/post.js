// import mongoose from "mongoose"
import { Schema, model } from "mongoose"

const PostSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User", // references the User Model's id in db
  },
  name: {
    type: String,
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  }
})

const Post = model("Post", PostSchema)

export default Post
