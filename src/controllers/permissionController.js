import * as permissionService from '../services/permissionService.js';

export const createPermission = async (req, res) =>{

    try {
       const permission = await permissionService.createPermission(req.body);
       res.status(200).json({success: true, message: 'La asignacion fue exitosa', permission});
    } catch (error) {
        res.status(500).json({success: false, message: error.message });
    }

};

export const getPermissions = async (req, res) =>{

    try {
       const permissions = await permissionService.getPermissions();
       res.status(200).json(permissions); 
    } catch (error) {
       res.status(500).json({success: false, message: error.message }); 
    }

};

export const getPermissionById = async (req, res) =>{

    try {
        const permission = await permissionService.getPermissionById(req.params.id);
        if(!permission){
            return res.status(404).json({success: false, message: 'Permiso no encontrado'});
        }
        res.status(200).json(permission);
    } catch (error) {
        res.status(500).json({success: false, message: error.message });
    }

};

export const updatePermission = async (req, res) =>{

    try {
        const updatePermission = await permissionService.updatePermission(req.params.id, req.body);
        if(!updatePermission){
            return res.status(404).json({success: false, message: 'Permiso no encontrado'});
        }
        res.status(200).json({success: true, message: 'Actualizacion exitosa', updatePermission});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }

};

export const deletePermission = async (req, res) => {

    try {
       const deletePermission = await permissionService.deletePermission(req.params.id);
       if(!deletePermission){
        return res.status(404).json({success: false, message: 'Permiso no encontrado'});
       } 
       res.status(200).json({success: true, message: 'Eliminacion existosa', deletePermission});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }

};