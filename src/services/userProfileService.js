import UserProfile from "../models/userProfileModel.js";

export const createUser = async (userData) => {
    return await UserProfile.create(userData);
};

export const getUsers = async () =>{
    return await UserProfile.find().populate('role_id organization_id');
};

export const getUserById = async (id) =>{
    return await UserProfile.findById(id).populate('role_id organization_id');
};

export const updateUser = async (id, userData) => {
    return await UserProfile.findByIdAndUpdate(id, userData, { new: true });
};

export const deleteUser = async (id) =>{
    return await UserProfile.findByIdAndDelete(id);
};

export const findUserByName = async (name) =>{
    
    return await UserProfile.find({ 
        $or: [
            { name: { $regex: name, $options: 'i' }},
            { lastname: { $regex: name, $options: 'i' }}

        ]
    });
}

