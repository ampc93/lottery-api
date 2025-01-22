import express from 'express';
import bodyParser from 'body-parser';
import { connectDB } from './config/db.js';
import organizationRoutes from './routes/organizationRoutes.js';
import roleRoutes from './routes/roleRoutes.js';

const app = express();

//Middleware
app.use( bodyParser.json() );

//Rutas
app.use('/api/organizations', organizationRoutes);
app.use('/api/roles', roleRoutes);

//Conectar a la base de datos
connectDB();

export default app;