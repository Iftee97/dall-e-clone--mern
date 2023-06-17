import express from 'express'
const router = express.Router()
import User from '../mongodb/models/user.js'

router.post('/login', async (req, res) => {
  const { email, fullName, image } = req.body
  try {
    let user = await User.findOne({ email })
    if (!user) {
      user = await User.create({ email, fullName, image })
    }
    res.status(200).json({
      success: true,
      data: user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Unable to login, please try again'
    })
  }
})

router.get('/get-logged-in-user', async (req, res) => {
  const { email } = req.query
  console.log('email: >>>>>>>>', email)
  if (email) {
    try {
      const user = await User.findOne({ email })
      res.status(200).json({
        success: true,
        data: user
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Unable to fetch user, please try again'
      })
    }
  }
})

export default router
