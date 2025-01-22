import { createRole,
         getRoles,
         getRoleById,
         updateRoleById,
         deleteRoleById } from '../services/roleService.js';

export const createRoleHandler = async (req, res) =>{
    
    try {
        const role = await createRole(req.body);
        res.status(200).json({message: 'El rol fue creado correctamente', role});
    } catch (error) {
       res.status(500).json( {message: 'Error al crear el rol', error: error.message } ); 
    }
};

export const getRolesHandler = async (req, res) =>{
    try {
        const roles = await getRoles();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json( {message: 'Error al buscar los roles', error: error.message } );
    }
};

export const getRoleByIdHandler = async (req, res) =>{
    try {
        const role = await getRoleById(req.params.id);
        if(!role) { res.status(404).json({message: 'No se encontro el rol'}) }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json( {message: 'Error al buscar el rol ', error: error.message } ); 
    }
};

export const updateRoleByIdHandler = async (req, res) =>{
    try {
        const role = await updateRoleById(req.params.id, req.body);
        if(!role) { res.status(404).json({message: 'No se encontro el rol'}) }
        res.status(200).json({message: 'El rol fue actualizado correctamente', role});
    } catch (error) {
        res.status(500).json( {message: 'Error al actualizar el rol ', error: error.message } );
    }
};

export const deleteRoleByIdHandler = async (req, res) => {

    try {
        const role = await deleteRoleById(req.params.id);
        if(!role) { res.status(404).json({message: 'No se encontro el rol'}) }
        res.status(200).json({message: 'El rol fue eliminado correctamente'});
    } catch (error) {
        res.status(500).json( {message: 'Error al eliminar el rol ', error: error.message } );
    }
};