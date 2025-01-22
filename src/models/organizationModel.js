import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
    description: { type: String, required: true },
    // address: { type: String, required: false},
    // phone: { type: String, required: false},
    // rnc: { type: String, required: false},
    // email: { type: String, required: false },
    available: { type: Boolean, default: true },
});

export const Organization = mongoose.model("Organization", organizationSchema);