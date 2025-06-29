const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {title: { type: String, required: true },
    content: { type: String, required: true },},
    {timestamps: true}
);

const Note = mongoose.model('Note', schema);

module.exports = Note;