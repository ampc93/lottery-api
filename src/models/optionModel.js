import mongoose from 'mongoose';

const subOptionSchema = new mongoose.Schema({
    key: { type: String, required: true},
    name: { type: String, required: true},
    description: { type: String}
});

const optionSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String},
    subOptions: [subOptionSchema]
});

export const Option = mongoose.model('Option', optionSchema);