const { Schema, model } = require('mongoose');

const noteSchema = Schema({
	text: {
		type: String,
	},
	image: {
		type: String,
		default: ""
	},
	done: {
		type: Boolean,
		default: false
	},
	createdAt: {
		type: Date,
		default: Date.now()
	}
})

module.exports = model("Note", noteSchema);