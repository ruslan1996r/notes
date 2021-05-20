const User = require("../models/User")

class UserController {
  register = async (req, res) => {
    try {
      const data = req.body
      const createdUser = await User(data).save()
      const token = await createdUser.generateToken(createdUser)
      return res.status(200).send({ user: createdUser, token })
    } catch (e) {
      console.error("register: ", e)
      return res.status(500).send(e)
    }
  }

  login = async (req, res) => {
    try {
      const data = req.body
      const user = await User.findOne({ username: data.username })
      if (!user) {
        return res.status(500).send({ error: "User does not exist" })
      }
      user.comparePassword(data.password, async (err, isMatch) => {
        if (!isMatch) return res.status(403).send({ error: "Wrong password" });
        const token = await user.generateToken(user)
        return res.status(200).send({ user, token })
      })
    } catch (e) {
      console.error("login: ", e)
      return res.status(500).send(e)
    }
  }

  getMe = async (req, res) => {
    try {
      const user = req.user
      if (user && user._id) {
        const token = await user.generateToken(user)
        return res.status(200).send({ user, token })
      }
      return res.status(403).send({ error: "Not authorized" })
    } catch (e) {
      console.error("getMe: ", e)
      return res.status(500).send(e)
    }
  }
}

module.exports = new UserController()