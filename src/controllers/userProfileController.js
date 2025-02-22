import * as userService from '../services/userProfileService.js';

// Helper para manejar errores de validación de ID
const handleIdError = (error, res) => {
    if (error.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: 'Formato de ID inválido'
        });
    }
    return res.status(500).json({ 
        success: false, 
        message: error.message 
    });
};

export const createUser = async (req, res) => {
    try {

        const token = req.cookies.authToken;

        const newUser = await userService.createUser(token, req.body);
        res.status(201).json({
            success: true,
            message: 'Usuario creado exitosamente',
            data: newUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error al crear usuario: ${error.message}`
        });
    }
};

export const getUsers = async (req, res) => {
    try {
        
        const token = req.cookies.authToken;

        // Verificar si el token está presente
        let { page = 1, limit = 10 } = req.query;

        // Convertir a enteros y validar
        page = parseInt(page, 10);
        limit = parseInt(limit, 10);

        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1) limit = 10;

        // Obtener usuarios desde el servicio
        const { users, total } = await userService.getUsers(token, page, limit);
        const totalPages = total > 0 ? Math.ceil(total / limit) : 0;

        res.status(200).json({
            success: true,
            data: users,
            pagination: { page, limit, total, totalPages }
        });
    } catch (error) {
        console.error("Error en getUsers:", error);
        res.status(500).json({
            success: false,
            message: `Error al obtener usuarios: ${error.message}`
        });
    }
};


export const getUserById = async (req, res) => {
    try {

        const user = await userService.getUserById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        handleIdError(error, res);
    }
};

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(
            req.params.id,
            req.body
        );
        
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado para actualizar'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Usuario actualizado exitosamente',
            data: updatedUser
        });
    } catch (error) {
        handleIdError(error, res);
    }
};

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await userService.deleteUser(req.params.id);
        
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado para eliminar'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Usuario eliminado exitosamente',
            data: deletedUser
        });
    } catch (error) {
        handleIdError(error, res);
    }
};

export const findUserByName = async (req, res) => {
    try {

        const token = req.cookies.authToken;

        let { name, page = 1, limit = 10 } = req.query;

        if (!name || name.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Parámetro de búsqueda requerido"
            });
        }

        // Conversión segura y validación
        page = parseInt(page);
        limit = parseInt(limit);
        
        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1) limit = 10;
        limit = Math.min(50, limit); // Establecer un máximo

        const { users, total } = await userService.findUserByName(
            token,
            name.trim(),
            page,
            limit
        );

        if (!users || users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron coincidencias"
            });
        }

        res.status(200).json({
            success: true,
            data: users,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error("Error en findUserByName:", error);
        res.status(500).json({
            success: false,
            message: `Error en la búsqueda: ${error.message}`
        });
    }
};
