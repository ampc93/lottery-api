import express from 'express';
import accessManagementController from '../controllers/accessManagementController.js';

const router = express.Router();

router.post('/login', accessManagementController.login);

export default router;