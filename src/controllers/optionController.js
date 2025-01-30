import { 
    createOption,
    getAllOptions,
    getOptionById,
    updateOption,
    addSubOption,
    deleteSubOption,
    deleteOption,
    findOptionsByDescription,
    findOptionByOneDescription,
    findSubOptionByOneName,
 } from "../services/optionService.js";

 export const createOptionHandler = async (req, res) =>{

    try {

        const data = req.body;

        if(!data.name || !data.description){
          return res.status(400).json({ success: false, message: "El nombre y la descripción son obligatorios."});
        }

        const normalizedName = data.name.trim().toLowerCase();
        const existingOption = await findOptionByOneDescription(normalizedName);
        if(existingOption){
          res.status(400).json({success: false, message: `La Opción "${normalizedName}" ya está registrada.`})
        }

        const option = await createOption(data);
        res.status(200).json({ success: true, message: 'Opción creada con éxito', option });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });  
    }

 };

 export const getAllOptionsHandler = async (req, res) => {
    try {
      const options = await getAllOptions();
      res.status(200).json(options);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  export const getOptionByIdHandler = async (req, res) => {
    try {

      const { id } = req.params;

      if(!id){
        return res.status(400).json({success: false, massege: 'El ID es obligatorio.'});
      }

      const option = await getOptionById(id);

      if(!option){
        return res.status(404).json({success: false, message: 'Opción no encontrada.'});
      }

      res.status(200).json(option);

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  export const updateOptionHandler = async (req, res) => {

    try {

      const { id } = req.params;
      const data = req.body;

      if(!id){
        return res.status(400).json({success: false, message: 'El ID es obligatorio.'});
      }

      if( !data.name || !data.description){
        return res.status(400).json({success: false, message: 'El nombre y la descripción son obligatorios.'});
      }

      const normalizedName = data.name.trim().toLowerCase();
      const existingOption = await findOptionByOneDescription(normalizedName);
      if( existingOption && existingOption._id.toString() !== id){
        return res.status(400).json({success: false, message: `La Opción "${normalizedName}" ya está registrada.`});
      }

      const option = await updateOption(id, data);
      res.status(200).json({success: true, message: 'Opción actualizada con éxito', option});

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }

  };
  
  export const addSubOptionHandler = async (req, res) => {

    try {

      const { id } = req.params;
      const subOption = req.body;

      if(!id || !subOption.name){
        return res.status(400).json({ success: false, message: 'El ID, la clave y el nombre de la subopción son obligatorios.'});
      }

      const normalizedName = subOption.name.trim().toLowerCase();
      const existingSubOption = await findSubOptionByOneName(id, subOption.name);
      if(existingSubOption){
        return res.status(400).json({success: false, message: `La SubOpción "${normalizedName}" ya está registrada.`});
      }

      const updatedOption = await addSubOption(id, subOption);
      res.status(200).json({success: true, message: 'Subopción creada con éxito', updatedOption});

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }

  };
  
  export const deleteSubOptionHandler = async (req, res) => {

    try {

      const { id, subOptionId } = req.params;

      if( !id || !subOptionId){
        return res.status(400).json({success: false, message: 'El ID de la opción y de la subopción son obligatorios.'});
      }

      const updatedOption = await deleteSubOption(id, subOptionId);
      res.status(200).json({success: true, message: 'Subopción eliminada con éxito', updatedOption});

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }

  };
  
  export const deleteOptionHandler = async (req, res) => {

    try {

      const { id } = req.params;

      if(!id){
        return res.status(400).json({ success: false, message: 'El ID es obligatorio.' });
      }

      const result = await deleteOption(id);

      if(!result){
        return res.status(404).json({success: false, message: 'Opción no encontrada.'});
      }

      res.status(200).json({ success: true, message: 'Opción eliminada con éxito', result });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }

  };


  export const getOptionByDescriptionHandler = async (req, res) =>{
  
      try {
          
          const { name } = req.query;
  
          if(!name){
              return res.status(400).json({ message: 'Debe proporcionar un nombre para realizar la búsqueda.' })
          }
  
          const option = await findOptionsByDescription(name.toLowerCase());
  
          if(!option){
              return res.status(404).json({ message: `No se encontró ningún opción con el nombre: "${name}".`});
          }
  
          res.status(200).json(option);
  
      } catch (error) {
          res.status(500).json({ message: 'Error al buscar la opción.', error: error.message });
      }

  }