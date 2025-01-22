import { Role } from '../models/roleModel.js';

export const createRole = async (data) =>{
    const role = new Role(data);
    return await role.save();
};

export const getRoles = async () =>{
    return await Role.find().populate('organization_id', 'description'); 
};

export const getRoleById = async (id) =>{
    return await Role.findById(id).populate('organization_id', 'description');
};

export const updateRoleById = async (id, data) =>{
    return await Role.findByIdAndUpdate(id, data, { new: true} ).populate('organization_id', 'description');
};

export const deleteRoleById = async (id) =>{
    return await Role.findByIdAndDelete(id);
};