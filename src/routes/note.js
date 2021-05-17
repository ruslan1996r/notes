const express = require('express');
const router = express.Router();
const multer = require('../multer')

router.post('/', multer, (req, res) => {
  console.log("req", req.body.title)
  console.log("FILES", req.file.path)
  res.send('test')
})

module.exports = router