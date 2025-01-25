import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    description: {type: String, required: true}
});

export const Role = mongoose.model("Role", roleSchema);