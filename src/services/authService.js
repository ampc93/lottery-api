import UserProfile from "../models/userProfileModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import redis from '../config/redisClient.js';

const loginUser = async (username, password) =>{

    try {

        const user = await UserProfile.findOne({username}).select('+password').populate('organization_id');

        if(!user){
            throw new Error('Usuario no encontrado');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new Error('Contraseña incorrecta');
        }

        if(!process.env.JWT_SECRET){
            throw new Error('Falta la clave JWT en las variables de entorno');
        }

        const token = jwt.sign(
            { id: user._id, role: user.role_id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }

        );

        const redisKey = `session:${user._id}`;
        await redis.set(redisKey, token, 'EX', 3600); //cada una hora

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
}

const logoutUser = async (userId) => {

    try {
       const redisKey = `session:${userId}`;
       await redis.del(redisKey);
       
       console.log(`Usuario ${userId} ha cerrado sesión`);
       return { message: 'Sesión cerrada correctamente' };

    } catch (error) {
        throw new Error(error.message || 'Error al cerrar sesión');
    }

};

const verifyToken = async (token) =>{

    try {
        
        if(!token){
            throw new Error('Token no proporcionado');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const redisKey = `session:${decoded.id}`;
        const storedToken = await redis.get(redisKey);

        if(!storedToken || storedToken !== token){
            throw new Error('Sesión no válida o expirada');
        }

        return decoded;

    } catch (error) {
        throw new Error('Token no válido o expirado');
    }
}


export default { loginUser, logoutUser, verifyToken }; 