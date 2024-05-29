import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { URL, PORT } from './constants/url';
import cors from 'cors';
import gitlabRouter from './routes/gitlab';
import ErrorHandler from './handlers/error';

const app = express();
app.use(cors());
app.use(express.json());

app.use(ErrorHandler);
app.use('/gitlab', gitlabRouter);

app.listen(PORT, () => {
  console.log(`웹훅 서버 실행 중 (${URL})`);
});
