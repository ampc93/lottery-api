import { createOrganization,
         getOrganizations,
         getOrganizationById,
         updateOrganization,
         deleteOrganization,
} from '../services/organizationService.js';

export const createOrganizationHandler = async (req, res) => {
    try {
        const organization = await createOrganization(req.body);
        res.status(201).json({ message: "La organizacion fue creada correctamente...", organization });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getOrganizationsHandler = async (req, res) => {

    try {
        const organizations = await getOrganizations();
        res.status(200).json(organizations);
    } catch (error) {
        res.status(500).json( { error: error.message } );
    };

};

export const getOrganizationByIdHandler = async (req, res) => {

    try {
        const organization = await getOrganizationById(req.params.id);
        if(!organization){
            res.status(404).json({ error: "No se encontro la organizacion "});
        }
        res.status(200).json(organization);
    } catch (error) {
        res.status(500).json( { error: error.message } );
    }

};

export const updateOrganizationHandler = async (req, res) => {
    try {
        const organization = await updateOrganization(req.params.id, req.body);
        if(!organization){
            res.status(404).json({ error: "No se encontro la organizacion " });
        }
        res.status(200).json( {message: "La organizacion fue actualizada correctamente ", organization} );
    } catch (error) {
        res.status(500).json( { error: error.message } )
    }
};

export const deleteOrganizationHandler = async (req, res) => {

    try {
        const organization = await deleteOrganization(req.params.id);
        if(!organization){
            res.status(404).json({ error: "No se encontro la organizacion "});
        }
        res.status(200).json({ message: "La organizacion fue eliminada correctamente " } );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
};