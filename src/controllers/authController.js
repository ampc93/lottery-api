import authService from "../services/authService.js";

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Usuario y contraseña son obligatorios' });
        }

        const result = await authService.loginUser(username, password, res);

        return res.status(200).json({ success: true, message: 'Bienvenido al sistema', result });
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message || 'Error en la autenticación' });
    }
};

const logoutUser = async (req, res) => {
    try {
        const userId = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: 'ID de usuario no proporcionado' });
        }

        const result = await authService.logoutUser(userId, res);
        return res.status(200).json({ success: true, message: result.message });
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message || 'Error al cerrar sesión' });
    }
};

const verifyToken = (req, res) => {
    try {
        
        const token = req.cookies.authToken || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ success: false, message: 'No se proporcionó un token' });
        }

        const verified = authService.verifyToken(token);

        return res.status(200).json({ success: true, message: 'Token válido', user: verified });
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Token inválido' });
    }
};

export default { loginUser, logoutUser, verifyToken };


// import authService from "../services/authService.js";

// const loginUser = async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         if (!username || !password) {
//             return res.status(400).json({ success: false, message: 'Usuario y contraseña son obligatorios' });
//         }

//         const result = await authService.loginUser(username, password, res);

//         return res.status(200).json({ success: true, message: 'Bienvenido al sistema', result });
        
//     } catch (error) {
//         return res.status(500).json({ success: false, message: error.message || 'Error en la autenticación' });
//     }
// };

// const logoutUser = async (req, res) => {
//     try {
//         const userId = req.user.id;

//         if (!userId) {
//             return res.status(400).json({ success: false, message: 'El userId es obligatorio' });
//         }

//         const result = await authService.logoutUser(userId, res);
//         return res.status(200).json({ success: true, message: result.message });
        
//     } catch (error) {
//         return res.status(500).json({ success: false, message: error.message || 'Error al cerrar sesión' });
//     }
// };

// const refreshTokens = async (req, res) => {
//     try {
//         const result = await authService.refreshTokens(req, res);
//         return res.status(200).json({ success: true, message: 'Tokens refrescados', result });
//     } catch (error) {
//         return res.status(500).json({ success: false, message: error.message || 'Error al refrescar el token' });
//     }
// };

// export default { loginUser, logoutUser, refreshTokens };

