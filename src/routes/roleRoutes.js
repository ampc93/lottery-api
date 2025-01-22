import express from 'express';
import { createRoleHandler,
         getRolesHandler,
         getRoleByIdHandler,
         updateRoleByIdHandler,
         deleteRoleByIdHandler,} from '../controllers/roleController.js';

const router = express.Router();

router.post('/', createRoleHandler);
router.get('/', getRolesHandler);
router.get('/:id', getRoleByIdHandler);
router.put('/:id', updateRoleByIdHandler);
router.delete('/:id', deleteRoleByIdHandler);

export default router;