import express from 'express';
import authRoutes from './routes/auth';
import chatRoutes from './routes/chat';
import messageRoutes from './routes/message';
import apiRoutes from './routes/api';
import listingsRoutes from './routes/listings';
import { authentication } from './middlewares/authenticaton';
import cors from 'cors';


const app = express();
const PORT: number = Number(process.env.PORT) || 5000;

app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://rahwa-haile.github.io',
    ],
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  })
);
app.use('/', authRoutes);
app.use('/', apiRoutes);
app.use('/', listingsRoutes);
app.use(authentication());
app.use('/', chatRoutes);
app.use('/', messageRoutes);

app.listen(PORT, () => {
  console.log(`app is listening at port ${PORT}`);
});
