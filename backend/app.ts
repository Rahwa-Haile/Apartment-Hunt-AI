import express, { Request, Response } from 'express';
import authRoutes from './routes/auth';
import chatRoutes from './routes/chat';
import messageRoutes from './routes/message';

const app = express();
const PORT: number = 5000;

app.use(express.json());
app.use('/', authRoutes);
app.use('/chats', chatRoutes)
app.use('/messages', messageRoutes)

app.listen(PORT, () => {
  console.log('app is listening at port 5000');
});
