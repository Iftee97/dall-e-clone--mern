import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  image: String,
})

const User = mongoose.model("User", UserSchema)

export default User
