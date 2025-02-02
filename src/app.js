import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; 
import { connectDB } from './config/db.js';
import organizationRoutes from './routes/organizationRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import optionRoutes from './routes/optionRoutes.js';
import permissionRoutes from './routes/permissionRoutes.js';

const app = express();

// Middleware
app.use(cors({ 
    origin: 'http://localhost:5173',  // Ajustar según el puerto del frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization']  // Encabezados permitidos
  }));

app.use( bodyParser.json() );

//Rutas
app.use('/api/organizations', organizationRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/options', optionRoutes);
app.use('/api/permissions', permissionRoutes);

//Conectar a la base de datos
connectDB();

export default app;