import express, { Request, Response } from 'express';
import authRoutes from './routes/auth';
import chatRoutes from './routes/chat';
import messageRoutes from './routes/message';
import gptRoute from './routes/gpt';
import { authentication } from './middlewares/authenticaton';
import cors from 'cors';

const app = express();
const PORT: number = 5000;

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  })
);
app.use('/', authRoutes);
// app.use(authentication());
app.use('/chats', chatRoutes);
app.use('/messages', messageRoutes);
app.use('/gpt', gptRoute);

app.listen(PORT, () => {
  console.log('app is listening at port 5000');
});
