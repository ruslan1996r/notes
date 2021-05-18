const express = require('express');
const router = express.Router();

const multer = require('../multer')
const { auth } = require('../middlewares/auth')
const NoteController = require("../controllers/noteController")

router.post('/', auth, multer, NoteController.create)
router.get('/', auth, NoteController.getAll)
router.delete('/:id', auth, NoteController.delete)
router.put('/:id', auth, multer, NoteController.update)

module.exports = router