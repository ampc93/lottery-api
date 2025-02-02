import { Permission } from '../models/permissionModel.js';

export const createPermission = async (data) =>{
    return await Permission.create(data);
};

export const getPermissions = async () => {
    return await Permission.find();
};

export const getPermissionById = async (id) =>{
    return await Permission.findById(id);
};

export const updatePermission = async (id, data) => {
    return await Permission.findByIdAndUpdate(id, data, { new: true});
};

export const deletePermission = async (id) =>{
    return await Permission.findByIdAndDelete(id);
};