// src/index.ts
import cors from 'cors';
import express, { Request, Response } from 'express';
import { userRouter } from './modules/routes/user.route';

const app = express();
// parser
app.use(express.json());
// cors
app.use(cors());

// application routes
// Implement the POST /api/users endpoint to create a new user.
app.use('/api', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
