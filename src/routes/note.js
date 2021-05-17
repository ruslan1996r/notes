const express = require('express');
const router = express.Router();
const multer = require('../multer')
const { auth } = require('../middlewares/auth')

router.post('/', auth, multer, (req, res) => {
  // console.log("req", req.body.title)
  // console.log("FILES", req.file.path)
  res.status(200).send({ notes: [1, 2, 3, 5] })
})

module.exports = router