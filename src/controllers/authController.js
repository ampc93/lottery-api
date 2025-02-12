import authService from "../services/authService.js";

const loginUser = async (req, res) =>{

    try {
        const { username, password } = req.body;

        if(!username || !password) {
            return res.status(404).json({success: false, message: 'Usuario y contraseña son obligatorios' });
        }

        const result = await authService.loginUser(username, password);
        return res.status(200).json({success: true, message: 'Bienvenido al sistema', result});
        
    } catch (error) {
       return res.status(500).json({success: false, message: error.message || 'Error en la autenticación'});
    }

};

const logoutUser = async (req, res) =>{

    try {

        const userId = req.user.id;

        if(!userId){
            return res.status(404).json({success: false, message: 'El userId es obligatorio'});
        }

        const result = await authService.logoutUser(userId);
        return res.status(200).json({success: true, message: result.message });
        
    } catch (error) {
       return res.status(500).json({success: false, message: error.message || 'Error al cerrar sesión' });
    }

};

const verify = async (req, res, next) =>{
    try {
        
        const token = req.headers.authorization?.split(" ")[1];
        const user = await authService.verifyToken(token);
        req.user = user;
        next();

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export default { loginUser, logoutUser, verify };