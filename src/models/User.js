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
    // unique: true
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

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch)
  })
}

userSchema.methods.generateToken = function () {
  const user = this
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { //({ userId: user._id }, JWT_SECRET, {
    expiresIn: "4h"
  });
  return token
}

userSchema.statics.findByToken = function (token, cb) {
  const user = this;
  const decoded = jwt.verify(token, JWT_SECRET)

  user.findById(decoded.userId, (err, user) => {
    if (err) return cb(err);
    cb(null, user);
  })
}

module.exports = model("User", userSchema);