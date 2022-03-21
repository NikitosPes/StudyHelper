const Router = require('express');
const router = new Router();
const notesController = require('../controllers/notes-controller.js')

router.get('/notes', notesController.getAllNotes);
router.delete('/notes/:id', notesController.deleteNoteById);
router.put('/notes/:id', notesController.editNodeById);
router.post('/notes', notesController.createNote);

module.exports = router
