import express, { Request, Response } from 'express';
const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hi this is you home page');
});

app.listen(5000, () => {
  console.log('app is running on port 5000');
});
