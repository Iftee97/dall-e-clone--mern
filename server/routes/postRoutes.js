import express from 'express'
import * as dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
import Post from '../mongodb/models/post.js'

dotenv.config()

const router = express.Router()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// GET ALL POSTS
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({}).populate("creator")
    res.status(200).json({
      success: true,
      data: posts
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fetching posts failed, please try again'
    })
  }
})

// GET LOGGED IN USER'S POSTS
router.get('/user/:id', async (req, res) => {
  try {
    const posts = await Post.find({ creator: req.params.id })
    res.status(200).json({
      success: true,
      data: posts
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fetching posts failed, please try again'
    })
  }
})

// ADD NEW POST
router.post('/', async (req, res) => {
  const { name, prompt, photo, userId } = req.body
  console.log({ name, prompt, userId })

  try {
    const photoUrl = await cloudinary.uploader.upload(photo)

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
      creator: userId
    })

    res.status(200).json({
      success: true,
      data: newPost
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Unable to create a post, please try again'
    })
  }
})

export default router
