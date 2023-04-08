const User = require('../models/User')

const userController = {
  //GET USER
  getUser: async (req, res) => {
    console.log('get user')
    try {
      const user = await User.findById(req.params.id)
      const { password, ...others } = user._doc
      res.status(200).json(others)
    } catch (err) {
      res.status(400).json(err)
    }
  },
  //GET ALL USER
  getAllUsers: async (req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword
      ? {
          $or: [
            {
              id: {
                $regex: req.query.keyword,
                $options: 'i',
              },
            },
            {
              name: {
                $regex: req.query.keyword,
                $options: 'i',
              },
            },
          ],
        }
      : {}
    const count = await User.countDocuments({ ...keyword })
    const users = await User.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
    res.json({ users, page, pages: Math.ceil(count / pageSize) })
  },

  //DELETE A USER
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json('User deleted')
    } catch (err) {
      res.status(500).json(err)
    }
  },
  //UPDATE USER
  updateUser: async (req, res) => {
    if (req.body.userId === req.params.id) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
      }
      try {
        const upadateUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true },
        )
        res.status(200).json(upadateUser)
      } catch (err) {
        res.status(400).json(err)
      }
    } else {
      res.status(401).json('Wrong user info')
    }
  },
}
//https://www.youtube.com/watch?v=dWMeUg1kobM
module.exports = userController
