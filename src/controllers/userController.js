const User = require("../models/User")
const UserModel = require("../models/User")

class UserController {
  register = (req, res) => {
    const user = req.body
    // console.log("User", UserModel.save)
    // const mm = new User(req.body)
    return User(user)
      .save()
      .then(createdUser => {
        // console.log("headers", res.headers)
        // console.log("createdUser", createdUser)
        return res.status(200).send(createdUser)
      })
      .catch(e => {
        console.log("register: ", e)
        return res.status(500).send(e)
      })
  }

  login = (req, res) => {
    try {
      const user = req.body
      // User.findOne()
    } catch (e) {
      console.log("login: ", e)
    }
  }
}

module.exports = new UserController()