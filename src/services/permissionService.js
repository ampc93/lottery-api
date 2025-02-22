import { Permission } from '../models/permissionModel.js';

// Crear un nuevo permiso
export const createPermission = async (data) => {
    try {
        const permission = await Permission.create(data);
        return permission;
    } catch (error) {
        throw new Error('Error al crear permiso: ' + error.message);
    }
};

// Obtener todos los permisos
export const getPermissions = async () => {
    try {
        const permissions = await Permission.find();
        return permissions;
    } catch (error) {
        throw new Error('Error al obtener permisos: ' + error.message);
    }
};

// Obtener un permiso por ID
export const getPermissionById = async (id) => {
    try {
        const permission = await Permission.findById(id);
        if (!permission) {
            throw new Error('Permiso no encontrado');
        }
        return permission;
    } catch (error) {
        throw new Error('Error al obtener permiso por ID: ' + error.message);
    }
};

// Actualizar un permiso por roleId
export const updatePermission = async (roleId, newPermissions) => {
    try {
        // Usar findOneAndUpdate para actualizar el array de permisos de un role
        const updatedPermission = await Permission.findOneAndUpdate(
            { roleId: roleId },  // Filtrar por roleId
            {
                $set: { permissions: newPermissions } // Actualizar el array de permisos
            },
            { new: true } // Retornar el documento actualizado
        );

        if (!updatedPermission) {
            throw new Error('Permiso no encontrado para este rol');
        }

        return updatedPermission;
    } catch (error) {
        throw new Error('Error al actualizar permisos: ' + error.message);
    }
};

// Eliminar un permiso por ID
export const deletePermission = async (id) => {
    try {
        const deletedPermission = await Permission.findByIdAndDelete(id);
        if (!deletedPermission) {
            throw new Error('Permiso no encontrado');
        }
        return deletedPermission;
    } catch (error) {
        throw new Error('Error al eliminar permiso: ' + error.message);
    }
};


// import { Permission } from '../models/permissionModel.js';

// export const createPermission = async (data) =>{
//     return await Permission.create(data);
// };

// export const getPermissions = async () => {
//     return await Permission.find();
// };

// export const getPermissionById = async (id) =>{
//     return await Permission.findById(id);
// };

// export const updatePermission = async (id, data) => {
//     return await Permission.findByIdAndUpdate(id, data, { new: true});
// };

// export const deletePermission = async (id) =>{
//     return await Permission.findByIdAndDelete(id);
// };