const { Schema, Types, model } = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require("../config/keys")

const userSchema = Schema({
  username: {
    type: String,
    maxlength: 50,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    maxlength: 50
  },
  notes: [{
    type: Types.ObjectId,
    ref: "Note"
  }]
})

userSchema.pre('save', function (next) {
  const user = this

  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

userSchema.methods.generateToken = () => {

  // const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
  //   expiresIn: "4h"
  // });
}

module.exports = model("User", userSchema);