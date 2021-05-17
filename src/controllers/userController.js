const User = require("../models/User")

class UserController {
  register = async (req, res) => {
    try {
      const data = req.body
      const createdUser = await User(data).save()
      const token = await User.generateToken(createdUser)
      res.status(200).send({ createdUser, token })
    } catch (e) {
      console.log("register: ", e)
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
        if (!isMatch) return res.json({ error: "Wrong password" });
        const token = await user.generateToken(user)
        return res.status(200).send({ token })
      })
    } catch (e) {
      console.log("login: ", e)
      return res.status(500).send(e)
    }
  }
}

module.exports = new UserController()