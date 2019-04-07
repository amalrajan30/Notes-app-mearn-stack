const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notesSchema = new Schema({
    owner: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    body : {
        type: String,
        required: true
    }
})

module.exports = Notes = mongoose.model("Notes", notesSchema)