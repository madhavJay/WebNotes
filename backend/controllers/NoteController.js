const Note = require('../model/Note'); // Adjust the path as necessary
async function GetAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({createdAt: -1}); // Fetch all notes from the database
        res.status(200).json(notes); // Respond with the notes in JSON format
    } catch (error) {
        console.log('Error fetching notes:', error); 
        res.status(500).json({ error: error.message }); 
    }
}

async function CreateNote(req, res) {
    try {
        const {Header, Content} = req.body; 
        const newNote = new Note({title: Header, content: Content}); 
        await newNote.save(); 
        res.status(201).json(newNote); 
    } catch (error) {
        console.log('Error creating note:', error);
        res.status(500).json({ error: error.message });
    }
}

async function UpdateNote(req, res) {
    try {
        const { id } = req.params; 
        const { Header, Content } = req.body; 
        const updatedNote = await Note.findByIdAndUpdate(id, { title: Header, content: Content }, { new: true }); 
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(updatedNote); 
    } catch (error) {
        console.log('Error updating note:', error);
        res.status(500).json({ error: error.message });
    }
}

async function DeleteNote(req, res) {
    try {
        const { id } = req.params; 
        const deletedNote = await Note.findByIdAndDelete(id); 
        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ message: 'Note deleted successfully' }); 
    } catch (error) {
        console.log('Error deleting note:', error);
        res.status(500).json({ error: error.message });
    }
}

async function GetNoteById(req, res) {
    try {
        const { id } = req.params; 
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(note);
    } catch (error) {
        console.log('Error fetching note by ID:', error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { GetAllNotes, CreateNote, UpdateNote, DeleteNote, GetNoteById}; // Use CommonJS export
