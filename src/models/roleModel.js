import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    description: { type: String, required: true },
    visible: { type: Boolean, default: true } // Nuevo campo agregado
});

export const Role = mongoose.model("Role", roleSchema);
