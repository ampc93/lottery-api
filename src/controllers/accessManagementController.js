import accessManagementService from "../services/accessManagementService.js";

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(404).json({ success: false, message: 'Usuario y contraseña requeridos' });
        }

        const result = await accessManagementService.loginUser(username, password);

        res.status(200).json({ success: true, message: 'Bienvenido al sistema', result });

    } catch (error) {
        res.status(500).json({ success: false, message: error?.message || 'Error interno del servidor' });
    }
};

export default { login };
