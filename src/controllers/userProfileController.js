import * as userService from '../services/userProfileService.js';

export const createUser = async (req, res) =>{

    try {
        const newUser = await userService.createUser(req.body);
        res.status(200).json({success: true, message: 'Registro creado exitosamente', newUser});
        
    } catch (error) {
        res.status(500).json({success: false, message: error.message });  
    }

};

export const getUsers = async (req, res) =>{

        try {
            const users = await userService.getUsers();
            res.status(200).json(users);
        } catch (error) {
           res.status(500).json({success: false, message: error.message});
        }
};

export const getUserById = async (req, res) => {

    try {
        const user = await userService.getUserById(req.params.id);
        if(!user) return res.status(404).json({success: false, message: 'Usuario no encontrado'});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }

};

export const updateUser = async (req, res) =>{

    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        if(!updateUser) return res.status(404).json({success: false, message: 'Usuario no encontrado'});
        res.status(200).json({success: true, message: 'Registro actualizado exitosamente', updatedUser});
    } catch (error) {
     res.status(500).json({success: false, message: error.message});   
    }

};

export const deleteUser = async (req, res) => {

    try {
        const deleteUser = await userService.deleteUser(req.params.id);
        if (!deleteUser) return res.status(404).json({success: false, message: 'Usuario no encontrado'});
        res.status(200).json({success: true, message: 'Usuario eliminado correctamente', deleteUser });
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }

}