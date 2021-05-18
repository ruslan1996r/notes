const Note = require("../models/Note")

class NoteController {
	create = async (req, res) => {
		try {
			const data = req.body
			const file = req.file

			const createdNote = await Note({
				text: data.text,
				done: data.done,
				image: `/uploads/${file.filename}`
			}).save()

			return res.status(200).send({ createdNote })
		} catch (e) {
			console.log("create: ", e)
			return res.status(500).send(e)
		}
	}
	getAll = async (req, res) => {
		try {
			const notes = await Note.find()
			return res.status(200).send(notes)
		} catch (e) {
			console.log("getAll: ", e)
			return res.status(500).send(e)
		}
	}
	delete = async (req, res) => {
		try {
			const { id } = req.params
			const result = await Note.findByIdAndDelete(id)
			return res.status(200).send({ result })
		} catch (e) {
			console.log("delete: ", e)
			return res.status(500).send(e)
		}
	}
	update = async (req, res) => {
		try {
			const { id } = req.params
			const data = req.body
			const file = req.file

			const updatedNote = await Note.findByIdAndUpdate(id, {
				text: data.text,
				done: data.done,
				image: `/uploads/${file.filename}`
			})
			
			return res.status(200).send({ updatedNote })
		} catch (e) {
			console.log("update: ", e)
			return res.status(500).send(e)
		}
	}
}

module.exports = new NoteController()