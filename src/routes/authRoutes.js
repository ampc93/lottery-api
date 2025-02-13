import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

// Ruta para iniciar sesión
router.post('/login', authController.loginUser);

// Ruta para cerrar sesión
router.post('/logout', authController.logoutUser);

// Ruta para verificar el token
router.get('/verify', authController.verifyToken);

export default router;


// import express from 'express';
// import authController from '../controllers/authController.js';

// const router = express.Router();

// router.post('/login', authController.loginUser);
// router.post('/logout', authController.logoutUser);  // Eliminar la verificación del token aquí
// router.post('/refresh', authController.refreshTokens);  // Ruta para refrescar tokens

// export default router;