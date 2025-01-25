import { createRole,
         getRoles,
         getRoleById,
         updateRoleById,
         deleteRoleById,
         findRoleByDescription,
         findRoleByOneDescription } from '../services/roleService.js';


export const createRoleHandler = async (req, res) => {
    try {
        const { description } = req.body;

        if (!description || typeof description !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'La descripción del rol es requerida y debe ser un texto válido.',
                role: {},
            });
        }

        // Convertir la descripción a minúsculas para normalizar
        const normalizedDescription = description.trim().toLowerCase();

        // Verificar si el rol ya existe
        const existingRole = await findRoleByOneDescription(normalizedDescription);
        if (existingRole) {
            return res.status(400).json({
                success: false,
                message: `El rol "${normalizedDescription}" ya está registrado.`,
                role: {},
            });
        }

        // Crear el nuevo rol
        const newRole = await createRole({ ...req.body, description: normalizedDescription });

        return res.status(201).json({
            success: true,
            message: 'El rol fue creado correctamente.',
            role: newRole,
        });
    } catch (error) {
        // Log detallado en desarrollo
        if (process.env.NODE_ENV === 'development') {
            console.error('Error en createRoleHandler:', error);
        }

        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor al crear el rol.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
};

export const getRolesHandler = async (req, res) =>{
    try {
        const roles = await getRoles();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json( {success: false, message: 'Error al buscar los roles', error: error.message } );
    }
};

export const getRoleByIdHandler = async (req, res) =>{
    try {
        const role = await getRoleById(req.params.id);
        if(!role) { res.status(404).json({message: 'No se encontro el rol'}) }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json( {success: false, message: 'Error al buscar el rol ', error: error.message } ); 
    }
};

export const updateRoleByIdHandler = async (req, res) =>{
   
    try {
        const { description } = req.body;

         // Verificar si el rol ya existe (excluyendo el rol actual)
         const existingRole = await findRoleByOneDescription(description.toLowerCase());
         if (existingRole && existingRole._id.toString() !== req.params.id) {
             return res.status(400).json({success: false,  message: `El rol "${description}" ya está registrado.` });
         }
 
        const updatedRole = await updateRoleById(req.params.id, { ...req.body, description: description.toLowerCase() });
        if (!updatedRole){
            res.status(404).json({success: false, message: 'No se encontro el rol'});
        }

        res.status(200).json({success: true, message: 'El rol fue actualizado correctamente', role: updatedRole });

    } catch (error) {
        res.status(500).json( {success: false, message: 'Error al actualizar el rol ', error: error.message } );
    }

};

export const deleteRoleByIdHandler = async (req, res) => {

    try {

        // const related = await isRoleRelated(req.params.id);
        // if(related){
        //     return res.status(400).json({ message: 'No se puede eliminar el rol porque está relacionado con otros registros.' });
        // }

        const deletedRole = await deleteRoleById(req.params.id);

        if(!deletedRole){
            res.status(404).json({success: false, message: 'No se encontro el rol'});
        }

        res.status(200).json({success: true, message: 'El rol fue eliminado correctamente'});

    } catch (error) {
        res.status(500).json( {success: false, message: 'Error al eliminar el rol ', error: error.message } );
    }
};

export const getRoleByDescriptionHandler = async (req, res) =>{

    try {
        
        const { description } = req.query;

        if(!description){
            return res.status(400).json({ message: 'Debe proporcionar una descripción para realizar la búsqueda.' })
        }

        const role = await findRoleByDescription(description.toLowerCase());

        if(!role){
            return res.status(404).json({ message: `No se encontró ningún rol con la descripción: "${description}".`});
        }

        res.status(200).json(role);

    } catch (error) {
        res.status(500).json({ message: 'Error al buscar el rol por descripción.', error: error.message });
    }
}