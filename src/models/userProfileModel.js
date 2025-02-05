import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userProfileSchema = new mongoose.Schema(

{
    name: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true},
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Por favor ingrese un email válido'] 
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: [4, 'El nombre de usuario debe tener al menos 4 caracteres']
    },
    password: { type: String, required: true, select: false},
    phone: {
        type: String,
        trim: true,
        match: [/^\d{10,15}$/, 'El teléfono debe contener entre 10 y 15 dígitos']
    },
    address: { type: String, trim: true },
    role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true},
    photo: { type: Buffer },
    available: { type: Boolean, default: true },
    organization_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }
 },
 {
    timestamps: true
 }
);

userProfileSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userProfileSchema.methods.camparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// userProfileSchema.index({ email: 1 });
// userProfileSchema.index({ username: 1 });

const UserProfile = mongoose.model('UserProfile',  userProfileSchema);
export default UserProfile;