import UserProfile from "../models/userProfileModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


async function convertirAJPEG(base64Data) {
    try {
        const imagenBuffer = Buffer.from(base64Data, 'base64');
        const imagenConvertida = await sharp(imagenBuffer)
            .jpeg({ quality: 80 })
            .toBuffer();
        const base64Convertida = imagenConvertida.toString('base64');
        return base64Convertida;
    } catch (error) {
        console.error('Error al convertir imagen a JPEG:', error);
        return null;
    }
}

const userOrganization = (token) => {

  const JWT_SECRET = process.env.JWT_SECRET;
  const decoded = jwt.verify(token, JWT_SECRET);

  const { organization } = decoded;

  return organization;

}

// Crear un nuevo usuario

export const createUser = async (token, userData) => {

  try {
    // Verificamos si hay una foto en Base64 y la convertimos a Buffer
    if (userData.photo) {
      userData.photo = Buffer.from(userData.photo, "base64");
    }

    // Hashear la contraseña antes de guardar el usuario
    if (userData.password) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
    }

    const organization = userOrganization(token);
    if(organization){
      userData.organization_id = organization;
    }

    const newUser = await UserProfile.create(userData);
    return newUser;
  } catch (error) {
    throw new Error(`Error al crear usuario: ${error.message}`);
  }

};

// Obtener todos los usuarios con paginación
export const getUsers = async (token, page = 1, limit = 10) => {

  try {
      // Convertir `page` y `limit` a números enteros y validar
      page = parseInt(page, 10);
      limit = parseInt(limit, 10);

      if (isNaN(page) || page < 1) page = 1;
      if (isNaN(limit) || limit < 1) limit = 10;

      const skip = (page - 1) * limit;

      // Si no hay token o es inválido, retornar todos los usuarios
      if (!token) {
          const [users, total] = await Promise.all([
              UserProfile.find()
                  .populate('role_id organization_id')
                  .skip(skip)
                  .limit(limit)
                  .lean(), // Optimiza la consulta
              UserProfile.countDocuments() // Total de usuarios
          ]);

          return { users, total };
      }

      const organization = userOrganization(token);

      // Ejecutar la consulta filtrando por `organization_id`
      const [users, total] = await Promise.all([
          UserProfile.find({ 'organization_id': organization, visible: true }) // Filtra por organization_id
              .populate('role_id organization_id')
              .skip(skip)
              .limit(limit)
              .lean(),
          UserProfile.countDocuments({ 'organization_id': organization, visible: true }) // Cuenta los usuarios de la empresa
      ]);

      return { users, total };

  } catch (error) {
      console.error("Error en getUsers:", error);
      throw error; // Propaga el error para manejo en el controlador
  }

};

// export const getUsers = async (token, page = 1, limit = 10) => {
//     try {
//         // Convertir `page` y `limit` a números enteros y validar
//         page = parseInt(page, 10);
//         limit = parseInt(limit, 10);

//         if (isNaN(page) || page < 1) page = 1;
//         if (isNaN(limit) || limit < 1) limit = 10;

//         const skip = (page - 1) * limit;

//         // Ejecutar ambas consultas en paralelo para mejorar rendimiento
//         const [users, total] = await Promise.all([
//             UserProfile.find()
//                 .populate('role_id organization_id')
//                 .skip(skip)
//                 .limit(limit)
//                 .lean(), // Optimiza la consulta
//             UserProfile.countDocuments()
//         ]);

//         return { users, total };

//     } catch (error) {
//         console.error("Error en getUsers:", error);
//         throw error; // Propaga el error para manejo en el controlador
//     }
// };

// Obtener un usuario por su ID
export const getUserById = async (id) => {
    return await UserProfile.findById(id).populate('role_id organization_id');
};

// Actualizar un usuario por su ID
export const updateUser = async (id, userData) => {
    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error("Formato de ID inválido");
      }
  
      // Obtener el usuario actual para no perder datos no enviados en la actualización
      const existingUser = await UserProfile.findById(id);
      if (!existingUser) {
        throw new Error("Usuario no encontrado");
      }
  
      // Si se proporciona una nueva foto, actualizarla; de lo contrario, mantener la existente
      if (userData.photo) {
        userData.photo = Buffer.from(userData.photo, "base64");
      } else {
        userData.photo = existingUser.photo; // Mantener la foto anterior
      }
  
      // Si se proporciona una nueva contraseña, encriptarla; de lo contrario, mantener la existente
      if (userData.password) {
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);
      } else {
        userData.password = existingUser.password; // Mantener la contraseña anterior
      }
  
      // Actualizar el usuario con los datos proporcionados
      const updatedUser = await UserProfile.findByIdAndUpdate(id, userData, { new: true });
  
      return updatedUser;
    } catch (error) {
      throw new Error(`Error al actualizar usuario: ${error.message}`);
    }
    
  };

// Eliminar un usuario por su ID
export const deleteUser = async (id) => {
    return await UserProfile.findByIdAndDelete(id);
};

// Buscar usuarios por nombre o apellido con paginación
export const findUserByName = async (token, name, page = 1, limit = 10) => {

    try {

        // Validar que el nombre sea una cadena no vacía
        if (!name || typeof name !== "string" || !name.trim()) {
            throw new Error("El nombre debe ser una cadena válida.");
        }

        // Convertir page y limit a números enteros
        page = parseInt(page, 10);
        limit = parseInt(limit, 10);

        // Validar que page y limit sean válidos
        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1) limit = 10;

        const skip = (page - 1) * limit;

        // Dividir el nombre en palabras
        const searchTerms = name.trim().split(/\s+/);

        // Función para normalizar texto eliminando acentos
        const normalizeString = (str) => {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        };

        // Construir la consulta para buscar en nombre y apellido
        const organization = userOrganization(token);

        const query = {
            visible: true,
            organization_id: organization,
            $or: searchTerms.map(term => ({
                $or: [
                    { name: new RegExp(normalizeString(term), "i") },  // Coincidencia insensible a mayúsculas en el nombre
                    { lastname: new RegExp(normalizeString(term), "i") }  // Coincidencia insensible a mayúsculas en el apellido
                ]
            }))
        };

        // Obtener los resultados y el total de coincidencias
        const [users, total] = await Promise.all([
            UserProfile.find(query).populate('role_id organization_id').skip(skip).limit(limit).lean(),
            UserProfile.countDocuments(query)  // Obtener el total de documentos que coinciden
        ]);

        return { users, total };
        
    } catch (error) {
        console.error("Error en findUserByName:", error);
        throw error;
    }
};




