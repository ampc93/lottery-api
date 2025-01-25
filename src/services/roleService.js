import { Role } from '../models/roleModel.js';

export const createRole = async (data) =>{
    const role = new Role(data);
    return await role.save();
};

export const getRoles = async () =>{
    return await Role.find(); 
};

export const getRoleById = async (id) =>{
    return await Role.findById(id);
};

export const updateRoleById = async (id, data) =>{
    return await Role.findByIdAndUpdate(id, data, { new: true} );
};

export const deleteRoleById = async (id) =>{
    return await Role.findByIdAndDelete(id);
};

export const findRoleByDescription = async (description) =>{
    return await Role.find({ description: { $regex: description, $options: 'i'} });
};


export const findRoleByOneDescription = async (description) =>{
    return await Role.findOne({
        description: { $regex: new RegExp(`^${description}$`, 'i') } // 'i' hace que la búsqueda sea insensible al caso
    });
}
// export const isRoleRelated = async (id) => {
//     const relatedRecords = await SomeRelatedModel.findOne({ id });
//     return !!relatedRecords;
// };