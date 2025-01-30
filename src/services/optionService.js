import { Option } from '../models/optionModel.js';

export const createOption = async (data) =>{

    try {

        const newOption = new Option(data);
        await newOption.save();
        return newOption;
        
    } catch (error) {
        throw new Error(`Error al crear la opción: ${error.message}`); 
    }

};

export const getAllOptions = async () =>{

    try {
        return await Option.find();
    } catch (error) {
        throw new Error(`Error al obtener las opciones: ${error.message}`); 
    }

};

export const getOptionById = async (id) =>{

    try {
        const option = await Option.findById(id);
        if(!option) throw new Error('Opción no encontrada');
        return option;  
    } catch (error) {
        throw new Error(`Error al obtener la opción: ${error.message}`);
    }
};

export const updateOption = async (id, data) =>{

    try {
        const updatedOption = await Option.findByIdAndUpdate(id, data, {new: true});
        if (!updatedOption) throw new Error('Opción no encontrada');
        return updatedOption;
    } catch (error) {
        throw new Error(`Error al actualizar la opción: ${error.message}`); 
    }
};

export const addSubOption = async (optionId, subOpcion) =>{

    try {
        const option = await Option.findById(optionId);
        if(!option) throw new Error('Opción no encontrada');
        option.subOptions.push(subOpcion);
        await option.save();
        return option;
    } catch (error) {
        throw new Error(`Error al agregar subopción: ${error.message}`);  
    }

};

export const deleteSubOption = async (optionId, subOptionId) =>{

    try {
        const option = await Option.findById(optionId);
        if(!option) throw new Error('Opción no encontrada');
        option.subOptions = option.subOptions.filter(
            (subOption) => subOption._id.toString() !== subOptionId
        );
        await option.save();
        return option;
    } catch (error) {
        throw new Error(`Error al eliminar la subopción: ${error.message}`);  
    }
};

export const deleteOption = async (id) =>{

    try {
        const result = await Option.findByIdAndDelete(id);
        if (!result) throw new Error('Opción no encontrada');
        return result;
    } catch (error) {
        throw new Error(`Error al eliminar la opción: ${error.message}`);
    }

};

export const findOptionsByDescription = async (description) =>{
    return await Option.find({ name: { $regex: description, $options: 'i'}});
};

export const findOptionByOneDescription = async (description) =>{
    return await Option.findOne({
        name: { $regex: new RegExp(`^${description}$`, 'i')}
    });
};

export const findSubOptionByOneName = async (id, name) => {

    try {

        const option = await Option.findById(id);
        if(!option){
            throw new Error('Opción no encontrada.');
        }

        const subOption = option.subOptions.find(
            subOption => subOption.name.toLowerCase() === name.toLowerCase()
        );

        return subOption || null;

    } catch (error) {
        throw new Error(`Buscar subOpción: ${error.message}`);
    }
    
}

