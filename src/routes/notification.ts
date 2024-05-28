import { Router } from 'express';
import { getNotifications } from '../db';
import { updateSchedule } from '../utils/schedule';

const router = Router();

router.get('/', async (req, res) => {
  const notifications = await getNotifications();
  res.json(notifications);
});

router.post('/', async (req, res) => {
  const data = req.body;
  await db.push(`/${data.id}`, data);
  await updateSchedule();
  res.status(201).send('알람 등록 성공!');
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  await db.delete(`/${id}`);
  await updateSchedule();
  res.status(200).send('알람 해제 성공!');
});

export default router;
