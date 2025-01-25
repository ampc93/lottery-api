import express from 'express';
import { createRoleHandler,
         getRolesHandler,
         getRoleByIdHandler,
         updateRoleByIdHandler,
         deleteRoleByIdHandler,
         getRoleByDescriptionHandler,} from '../controllers/roleController.js';

const router = express.Router();

router.post('/', createRoleHandler);
router.get('/', getRolesHandler);
router.get('/search', getRoleByDescriptionHandler);
router.get('/:id', getRoleByIdHandler);
router.put('/:id', updateRoleByIdHandler);
router.delete('/:id', deleteRoleByIdHandler);

export default router;