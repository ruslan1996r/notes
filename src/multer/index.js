const multer = require("multer")
const path = require('path')

const permittedExt = ['.jpg', '.png']

let storage = multer.diskStorage({
  destination: path.join('src', 'uploads'),
  filename: (req, file, cb) => {
    cb(null, String(Date.now()) + path.extname(file.originalname))
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (permittedExt.indexOf(ext) == -1) {
      return cb(res.status(400).end('only jpg, png are allowed'), false);
    }
    cb(null, true)
  }
})

module.exports = multer({ storage }).single("file")