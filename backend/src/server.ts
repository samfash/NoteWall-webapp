import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors = require('cors')

import authRoutes from './routes/authRoutes';
import noteRoutes from './routes/noteRoutes';
import { authMiddleware } from './middlewares/authMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/notes', authMiddleware, noteRoutes);

mongoose.connect(process.env.MONGODB_URI!)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(error => console.log(error.message));
