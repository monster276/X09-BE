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
    try {
      const user = await User.find()
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err)
    }
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

module.exports = userController
