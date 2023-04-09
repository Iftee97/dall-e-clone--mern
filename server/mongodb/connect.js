import mongoose from "mongoose"

export default function connectDb(url) {
  mongoose.set("strictQuery", true)

  mongoose.connect(url)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => {
      console.error('failed to connect with mongo')
      console.log(error)
    })
}
