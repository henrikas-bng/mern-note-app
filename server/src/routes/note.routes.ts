import express from 'express';
import * as NoteController from '../controllers/note.controller';

const router = express.Router();

router.get('/:noteId', NoteController.getById);
router.get('/all', NoteController.getAll);
router.post('/create', NoteController.create);
router.post('/update/:noteId', NoteController.update);
router.delete('/delete/:noteId', NoteController.destroy);

export default router;
