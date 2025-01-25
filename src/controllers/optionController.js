import { 
    createOption,
    getAllOptions,
    getOptionById,
    updateOption,
    addSubOption,
    deleteSubOption,
    deleteOption,
 } from "../services/optionService.js";

 export const createOptionHandler = async (req, res) =>{

    try {
        const data = req.body;
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
      const option = await getOptionById(id);
      res.status(200).json(option);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  export const updateOptionHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedOption = await updateOption(id, data);
      res.status(200).json({success: true, message: 'Opción actualizada con éxito', updatedOption});
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  export const addSubOptionHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const subOption = req.body;
      const updatedOption = await addSubOption(id, subOption);
      res.status(200).json({success: true, message: 'Subopción creada con éxito', updatedOption});
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  export const deleteSubOptionHandler = async (req, res) => {
    try {
      const { id, subOptionId } = req.params;
      const updatedOption = await deleteSubOption(id, subOptionId);
      res.status(200).json({success: true, message: 'Subopción eliminada con éxito', updatedOption});
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  export const deleteOptionHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await deleteOption(id);
      res.status(200).json({ success: true, message: 'Opción eliminada con éxito', result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };