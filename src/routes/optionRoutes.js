import express from 'express';
import {
  createOptionHandler,
  getAllOptionsHandler,
  getOptionByIdHandler,
  updateOptionHandler,
  addSubOptionHandler,
  deleteSubOptionHandler,
  deleteOptionHandler,
  getOptionByDescriptionHandler,
} from '../controllers/optionController.js';

const router = express.Router();

// Crear una nueva opción
router.post('/', createOptionHandler);
router.get('/', getAllOptionsHandler);
router.get('/search', getOptionByDescriptionHandler); 
router.get('/:id', getOptionByIdHandler);
router.put('/:id', updateOptionHandler);
router.post('/:id/suboptions', addSubOptionHandler);
router.delete('/:id/suboptions/:subOptionId', deleteSubOptionHandler);
router.delete('/:id', deleteOptionHandler);

export default router;