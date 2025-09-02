import express, { Request, Response } from 'express';
const app = express();
import { connectDB } from './db/connectDB';

const PORT: number = 5000;

app.get('/', async (req: Request, res: Response) => {
  const [rows] = await connectDB.query('SELECT 1+1 AS result');
  res.json({ result: rows });
});

app.listen(5000, () => {
  console.log('app is listening at port 5000');
});
