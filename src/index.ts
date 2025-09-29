import express from 'express';
import { connectDB } from './database';
import taskRoutes from './routes/taskRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
app.use(express.json());
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

connectDB();

app.listen(3000, () => console.log('Server listening on 3000'));