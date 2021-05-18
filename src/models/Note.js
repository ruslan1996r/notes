const { Schema, Types, model } = require('mongoose');

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
	}
})

module.exports = model("Note", noteSchema);