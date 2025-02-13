import UserProfile from "../models/userProfileModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import redis from '../config/redisClient.js';

const loginUser = async (username, password, res) => {

    try {
        const user = await UserProfile.findOne({ username }).select('+password').populate('organization_id');
        
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            throw new Error('Contraseña incorrecta');
        }

        // Usar la clave secreta de la variable de entorno
        const JWT_SECRET = process.env.JWT_SECRET;

        // Generar el access token
        const accessToken = jwt.sign(
            { id: user._id, role: user.role_id },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Enviar el access token en un cookie HttpOnly
        res.cookie('authToken', accessToken, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000, // 1 hora
            sameSite: 'Lax'
        });

        return {
            accessToken,
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

const logoutUser = async (userId, res) => {
    try {
        res.clearCookie('authToken');
        const redisKey = `session:${userId}`;
        await redis.del(redisKey);
        
        console.log(`Usuario ${userId} ha cerrado sesión`);
        return { message: 'Sesión cerrada correctamente' };
    } catch (error) {
        throw new Error(error.message || 'Error al cerrar sesión');
    }
};

const verifyToken = (token) => {
    try {
        // Verificar el token usando la clave secreta del entorno
        const JWT_SECRET = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error('Token no válido o expirado');
    }
};

export default { loginUser, logoutUser, verifyToken };


// import UserProfile from "../models/userProfileModel.js";
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import redis from '../config/redisClient.js';
// import crypto from 'crypto';

// // Función para generar claves secretas de forma automática
// const generateSecretKey = (length = 32) => {
//     return crypto.randomBytes(length).toString('hex');
// };

// const loginUser = async (username, password, res) => {
//     try {
//         const user = await UserProfile.findOne({ username }).select('+password').populate('organization_id');
        
//         if (!user) {
//             throw new Error('Usuario no encontrado');
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
        
//         if (!isMatch) {
//             throw new Error('Contraseña incorrecta');
//         }

//         // Generar claves secretas de forma automática
//         const JWT_SECRET = generateSecretKey();
//         const JWT_REFRESH_SECRET = generateSecretKey();

//         // Generar el access token
//         const accessToken = jwt.sign(
//             { id: user._id, role: user.role_id },
//             JWT_SECRET,
//             { expiresIn: '1h' }
//         );

//         // Generar el refresh token
//         const refreshToken = jwt.sign(
//             { id: user._id },
//             JWT_REFRESH_SECRET,
//             { expiresIn: '7d' }
//         );

//         // Almacenar el refresh token en Redis
//         const redisKey = `refresh:${user._id}`;
//         await redis.set(redisKey, refreshToken, 'EX', 60 * 60 * 24 * 7); // Expira en 7 días

//         // Enviar el access token en un cookie HttpOnly
//         res.cookie('authToken', accessToken, {
//             httpOnly: false,
//             secure: process.env.NODE_ENV === 'production',
//             maxAge: 3600000,
//             sameSite: 'Lax'
//         });

//         // Enviar el refresh token en un cookie HttpOnly también
//         res.cookie('refreshToken', refreshToken, {
//             httpOnly: false,
//             secure: process.env.NODE_ENV === 'production',
//             maxAge: 60 * 60 * 24 * 7 * 1000,  // 7 días
//             sameSite: 'Lax'
//         });

//         return {
//             accessToken,
//             refreshToken,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 username: user.username,
//                 role: user.role_id,
//                 organization: user.organization_id
//             }
//         };
        
//     } catch (error) {
//         throw new Error(error.message || 'Error en la autenticación');
//     }
// };

// const refreshTokens = async (req, res) => {
//     try {
//         const refreshToken = req.cookies.refreshToken;
        
//         if (!refreshToken) {
//             throw new Error('Refresh token no proporcionado');
//         }

//         // Verificar el refresh token
//         const decoded = jwt.verify(refreshToken, generateSecretKey());
//         const redisKey = `refresh:${decoded.id}`;
//         const storedRefreshToken = await redis.get(redisKey);

//         if (!storedRefreshToken || storedRefreshToken !== refreshToken) {
//             throw new Error('Refresh token no válido o expirado');
//         }

//         // Crear un nuevo access token
//         const newAccessToken = jwt.sign(
//             { id: decoded.id, role: decoded.role },
//             generateSecretKey(),
//             { expiresIn: '1h' }
//         );

//         // Crear un nuevo refresh token
//         const newRefreshToken = jwt.sign(
//             { id: decoded.id },
//             generateSecretKey(),
//             { expiresIn: '7d' }
//         );

//         // Actualizar el refresh token en Redis
//         await redis.set(redisKey, newRefreshToken, 'EX', 60 * 60 * 24 * 7);

//         // Enviar los nuevos tokens
//         res.cookie('authToken', newAccessToken, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             maxAge: 3600000,
//             sameSite: 'Lax'
//         });

//         res.cookie('refreshToken', newRefreshToken, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             maxAge: 60 * 60 * 24 * 7 * 1000,  // 7 días
//             sameSite: 'Lax'
//         });

//         return {
//             accessToken: newAccessToken,
//             refreshToken: newRefreshToken
//         };
//     } catch (error) {
//         throw new Error('Refresh token no válido o expirado');
//     }
// };

// const logoutUser = async (userId, res) => {
//     try {
//         res.clearCookie('authToken');
//         res.clearCookie('refreshToken');
//         const redisKey = `session:${userId}`;
//         await redis.del(redisKey);
        
//         console.log(`Usuario ${userId} ha cerrado sesión`);
//         return { message: 'Sesión cerrada correctamente' };
//     } catch (error) {
//         throw new Error(error.message || 'Error al cerrar sesión');
//     }
// };

// export default { loginUser, logoutUser, refreshTokens };
