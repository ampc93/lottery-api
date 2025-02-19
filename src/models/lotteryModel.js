import mongoose from 'mongoose';

const lotterySchema = new mongoose.Schema({
    description: { type: String, required: true, trim: true },
    available: { type: Boolean, default: true },
    logo: { type: Buffer },
}, 
{ timestamps: true });

const Lottery = mongoose.model('Lottery', lotterySchema);

export default Lottery;
