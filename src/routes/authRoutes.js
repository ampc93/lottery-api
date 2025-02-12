import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

router.post('/login',  authController.loginUser);
router.post('/logout', authController.verify, authController.logoutUser);
router.post('/verify', authController.verify, (req, res) =>{
    res.status(200).json({
        success: true,
        message: 'Token válido',
        user: req.user
    });
});

export default router;