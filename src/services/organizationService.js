import { Organization } from "../models/organizationModel.js";

export const createOrganization = async (data) =>{
    const organization = new Organization(data);
    return await organization.save();
};

export const getOrganizations = async () => {
    return await Organization.find();
};

export const getOrganizationById = async (id) =>{
    return await Organization.findById(id);
};

export const updateOrganization = async (id, data) =>{
    return await Organization.findByIdAndUpdate(id, data, {new: true} );
};

export const deleteOrganization = async (id) => {
    return await Organization.findByIdAndDelete(id);
}