import Lottery from "../models/lotteryModel.js";

// Función para convertir el logo a Base64 y eliminar el campo logo
const convertLogoToBase64 = (lottery) => {
    const lotteryObj = lottery.toObject();
    if (lottery.logo) {
        const binaryData = new Uint8Array(lottery.logo);
        const buffer = Buffer.from(binaryData);
        const base64String = buffer.toString('base64');
        lotteryObj.logoBase64 = base64String;
    } else {
        lotteryObj.logoBase64 = '';
    }
    delete lotteryObj.logo;
    return lotteryObj;
};

export const createLottery = async (data) => {
    if (data.logo) {
        if (typeof data.logo === 'string') {
            data.logo = Buffer.from(data.logo, "base64");
        }
    }
    return await Lottery.create(data);
};

export const getLotteries = async (page = 1, limit = 10) => {
    try {
        page = parseInt(page, 10);
        limit = parseInt(limit, 10);

        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1) limit = 10;

        const skip = (page - 1) * limit;

        const [lotteries, total] = await Promise.all([
            Lottery.find()
                .skip(skip)
                .limit(limit), 
            Lottery.countDocuments()
        ]);

        return {
            lotteries: lotteries.map(lottery => convertLogoToBase64(lottery)),
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit)
        };

    } catch (error) {
        console.error('Error en getLotteries:', error);
        throw error;
    }
};

export const getLotteryById = async (id) => {
    const lottery = await Lottery.findById(id);
    return convertLogoToBase64(lottery);
};

export const updateLottery = async (id, data) => {
    if (data.logo) {
        if (typeof data.logo === 'string') {
            data.logo = Buffer.from(data.logo, "base64");
        }
    }

    return await Lottery.findByIdAndUpdate(id, data, {new: true});
};

export const deleteLottery = async (id) => {
    return await Lottery.findByIdAndDelete(id);
};

export const searchLotteryByDescription = async (description, page = 1, limit = 10) => {
    try {
        page = parseInt(page, 10);
        limit = parseInt(limit, 10);

        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1) limit = 10;

        const skip = (page - 1) * limit;

        const [lotteries, total] = await Promise.all([
            Lottery.find({
                description: { $regex: description, $options: 'i' }
            })
                .skip(skip)
                .limit(limit),
            Lottery.countDocuments({
                description: { $regex: description, $options: 'i' }
            })
        ]);

        return {
            lotteries: lotteries.map(lottery => convertLogoToBase64(lottery)),
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit)
        };
    } catch (error) {
        console.error('Error en searchLotteryByDescription:', error);
        throw error;
    }
};
