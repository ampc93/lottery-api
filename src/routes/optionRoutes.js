import express from 'express';
import {
  createOptionHandler,
  getAllOptionsHandler,
  getOptionByIdHandler,
  updateOptionHandler,
  addSubOptionHandler,
  deleteSubOptionHandler,
  deleteOptionHandler,
} from '../controllers/optionController.js';

const router = express.Router();

// Crear una nueva opción
router.post('/', createOptionHandler);

// Obtener todas las opciones
router.get('/', getAllOptionsHandler);

// Obtener una opción por ID
router.get('/:id', getOptionByIdHandler);

// Actualizar una opción completa
router.put('/:id', updateOptionHandler);

// Agregar una subopción
router.post('/:id/suboptions', addSubOptionHandler);

// Eliminar una subopción específica
router.delete('/:id/suboptions/:subOptionId', deleteSubOptionHandler);

// Eliminar una opción completa
router.delete('/:id', deleteOptionHandler);

export default router;