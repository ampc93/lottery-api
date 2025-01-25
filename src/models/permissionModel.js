import mongoose from 'mongoose';

const permissionSchema = new mongoose.Schema({
    roleId: {type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    optionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Option', required: true},
    permissions: {type: map, of: Boolean}
});

export const Pemissions = mongoose.model('Pemissions', permissionSchema);