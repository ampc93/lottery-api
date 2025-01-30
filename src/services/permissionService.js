import { Permissions } from '../models/permissionModel.js';
import { Role } from '../models/roleModel.js';
import { Option } from '../models/optionModl.js';

export const assignOptionToRole = async (roleId, optionId, permissions) =>{

    try {

        const role = await Role.findById(roleId);
        if(!role) throw new Error('Rol no encontrado');

        const option = await Option.findById(optionId);
        if(!option) throw new Error('Opción no encontrada.');

        let permission = await Permissions.findOne({ roleId, optionId });
        if(permission){
            permission.Permissions = { ...permission.permissions, ...permissions};
        } else {
            permission = new Permissions({ roleId, optionId, permissions });
        }

        await permission.save();
        return permission;
        
    } catch (error) {
        throw new Error(`Error al asignar opción al rol: ${error.message}`);
    }

};

export const getOptionsByRole = async (roleId) => {

    try {
        const permissions = await Permissions.find({ roleId }).populate('optionId').lean();
        return permissions;
    } catch (error) {
        throw new Error(`Error al obtener opciones del rol: ${error.message}`);
    }

};

export const removeOptionFromRole = async (roleId, optionId) =>{

    try {
        const result = await Permissions.findOneAndDelete({ roleId, optionId });
        if(!result) throw new Error('No se encontró la asignación de opción en el rol.');
        return result;
    } catch (error) {
        throw new Error(`Error al eliminar opción del rol: ${error.message}`);
    }
};

export const updatePermissionForRole = async (roleId, optionId, permissions) =>{
    try {

        const permission = await Permissions.findOne({ roleId, optionId, permissions });
        if(!permission) throw new Error('Asignación de opción no encontrada.');

        permission.permissions = { ...permission.permissions, ...permissions };
        await permission.save();
        return permission;
        
    } catch (error) {
        throw new Error(`Error al actualizar permisos del rol: ${error.message}`);
    }
};