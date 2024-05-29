import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { URL, PORT } from './constants/url';
import cors from 'cors';
import gitlabRouter from './routes/gitlab';
import notificationRouter from './routes/notification';
import { registerCronJobs } from './utils/crons';
import { updateSchedule } from './utils/schedule';
import { initializeDB } from './db';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/gitlab', gitlabRouter);
app.use('/notification', notificationRouter);

app.listen(PORT, () => {
  console.log(`웹훅 서버 실행 중 (${URL})`);
  initializeDB();
  registerCronJobs();
  updateSchedule();
});
