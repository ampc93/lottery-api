import UserProfile from '../models/userProfileModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginUser = async (username, password) => {
    try {
        // Buscar usuario con la contraseña incluida y su organización
        const user = await UserProfile.findOne({ username }).select('+password').populate('organization_id');

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Contraseña incorrecta');
        }

        // Verificar que la clave JWT esté definida
        if (!process.env.JWT_SECRET) {
            throw new Error('Falta la clave JWT en las variables de entorno');
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: user._id, role: user.role_id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Retornar token y datos del usuario
        return {
            token,
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                role: user.role_id,
                organization: user.organization_id
            }
        };

    } catch (error) {
        throw new Error(error.message || 'Error en la autenticación');
    }
};

export default { loginUser };
