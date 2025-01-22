import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    description: {type: String, required: true},
    available: {type: Boolean, default: true},
    organization_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
});

export const Role = mongoose.model("Role", roleSchema);