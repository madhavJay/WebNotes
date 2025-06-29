const express = require('express');
const bodyParser = require('body-parser');
const NoteController = require('../controllers/NoteController'); // Adjust the path as necessary

const router = express.Router();

router.get('/', NoteController.GetAllNotes);
router.get('/:id', NoteController.GetNoteById);
router.post('/', NoteController.CreateNote);
router.put('/:id', NoteController.UpdateNote);
router.delete('/:id', NoteController.DeleteNote)

module.exports = router;