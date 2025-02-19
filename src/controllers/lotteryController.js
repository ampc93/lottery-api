import * as lotteryService from '../services/lotteryService.js';

// Crear nuevo registro de lotería
export const createLotteryController = async (req, res) => {
    try {
        const lottery = await lotteryService.createLottery(req.body);
        res.status(200).json({ success: true, message: 'El registro fue creado correctamente.', lottery });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Obtener loterías con paginación
export const getLotteriesController = async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query;

        // Convertir a enteros y validar
        page = parseInt(page, 10);
        limit = parseInt(limit, 10);

        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1) limit = 10;
        limit = Math.min(50, limit); // Máximo de 50 registros por página

        // Obtener loterías con paginación desde el servicio
        const { lotteries, total } = await lotteryService.getLotteries(page, limit);
        const totalPages = total > 0 ? Math.ceil(total / limit) : 0;

        res.status(200).json({
            success: true,
            data: lotteries,
            pagination: {
                page,
                limit,
                total,
                totalPages
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Obtener lotería por ID
export const getLotteryByIdController = async (req, res) => {
    try {
        const lottery = await lotteryService.getLotteryById(req.params.id);
        if (!lottery) return res.status(400).json({ success: false, message: 'Registro no encontrado' });
        res.status(200).json({ success: true, lottery });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Actualizar lotería
export const updateLotteryController = async (req, res) => {
    try {
        const lottery = await lotteryService.updateLottery(req.params.id, req.body);
        if (!lottery) return res.status(400).json({ success: false, message: 'Registro no encontrado' });
        res.status(200).json({ success: true, message: 'El registro fue actualizado exitosamente.', lottery });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Eliminar lotería
export const deleteLotteryController = async (req, res) => {
    try {
        const lottery = await lotteryService.deleteLottery(req.params.id);
        if (!lottery) return res.status(400).json({ success: false, message: 'Registro no encontrado' });
        res.status(200).json({ success: true, message: 'El registro fue eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Buscar lotería por descripción con paginación
export const searchLotteryByDescriptionController = async (req, res) => {
    try {
        const { description, page = 1, limit = 10 } = req.query;

        if (!description || description.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Parámetro de búsqueda requerido"
            });
        }

        // Conversión segura y validación
        const parsedPage = parseInt(page, 10);
        const parsedLimit = parseInt(limit, 10);

        const validPage = isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
        const validLimit = isNaN(parsedLimit) || parsedLimit < 1 ? 10 : Math.min(50, parsedLimit);

        const { lotteries, total } = await lotteryService.searchLotteryByDescription(description.trim(), validPage, validLimit);

        res.status(200).json({
            success: true,
            data: lotteries,
            pagination: {
                page: validPage,
                limit: validLimit,
                total,
                totalPages: Math.ceil(total / validLimit)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// import  * as lotteryService  from '../services/lotteryService.js';

// export const createLotteryController = async (req, res) => {

//     try {
//         const lottery = await lotteryService.createLottery(req.body);
//         res.status(200).json({ success: true, message: 'El registro fue creado correctamente.', lottery});
//     } catch (error) {
//        res.status(500).json({ success: false, message: error.message }); 
//     }

// };

// export const getLotteriesController = async (req, res) =>{

//     try {
//        const lotteries = await lotteryService.getLotteries();
//        res.status(200).json({ success: true, lotteries}); 
//     } catch (error) {
//       res.status(500).json({ success: false, message: error.message });  
//     }

// };

// export const getLotteryByIdController = async (req, res) =>{

//     try {
//        const lottery = await lotteryService.getLotteryById(req.params.id);
//        if(!lottery) return res.status(400).json({ success: false, message: 'Registro no encontrado'});
//        res.status(200).json({success: true, lottery });
//     } catch (error) {
//        res.status(500).json({ success: false, message: error.message }); 
//     }

// };


// export const updateLotteryController = async (req, res) =>{
//     try {
//        const lottery = await lotteryService.updateLottery(req.params.id, req.body);
//        if(!lottery) return res.status(400).json({success: false, message: 'Registro no encontrado'});
//        res.status(200).json({success: true, message: 'El registro fue actualizado existosamente.', lottery}); 
//     } catch (error) {
//        res.status(500).json({ success: false, message: error.message }); 
//     }
// };

// export const deleteLotteryController = async (req, res) =>{
    
//     try {
//         const lottery = await lotteryService.deleteLottery(req.params.id);
//         if(!lottery) return res.status(400).json({success: false, message: 'Registro no encontrado'});
//         res.status(200).json({success: true, message: 'El registro fue eliminado correctamente'});
//     } catch (error) {
//         res.status(500).json({success: false, message: error.message });
//     }

// };

// export const searchLotteryByDescriptionController = async (req, res) =>{
//     try {
//       const { description } = req.query;
//       const lotteries = await lotteryService.searchLotteryByDescription(description);
//       res.status(200).json({success: true, lotteries});
//     } catch (error) {
//       res.status(500).json({success: false, message: error.message});  
//     }
// };