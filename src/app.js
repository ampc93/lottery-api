import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './config/db.js';
import organizationRoutes from './routes/organizationRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import optionRoutes from './routes/optionRoutes.js';
import permissionRoutes from './routes/permissionRoutes.js';
import userProfileRoutes from './routes/userProfileRoutes.js';
import authRoutes from './routes/authRoutes.js';
import multer from 'multer';

const app = express();

// **Configuración de CORS**
app.use(cors({ 
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// **Configuración de Express para manejar JSON grandes**
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());

// **Configurar Multer para manejar imágenes**
const storage = multer.memoryStorage();
const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Límite de 5MB por archivo
});

// **Rutas**
app.use('/api/organizations', organizationRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/options', optionRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/users', userProfileRoutes);
app.use('/api/auth', authRoutes);

// **Conectar a la base de datos**
connectDB();

export default app;
