import { Router } from 'express';
import { sendGroupMessage } from '../utils/bot';
import { getNotifications } from '../db';
import { updateSchedule } from '../utils/schedule';

const router = Router();

router.get('/vote', async (req, res) => {
  await sendGroupMessage('🔔🔔🔔🔔🔔12시까지 우수연구원 투표🔔🔔🔔🔔🔔');
  return res.status(200).send('vote notification success!');
});

router.get('/weekly-report', async (req, res) => {
  await sendGroupMessage('🔔🔔🔔🔔🔔퇴근 전 주간보고 작성🔔🔔🔔🔔🔔');
  return res.status(200).send('vote notification success!');
});

router.get('/scrum', async (req, res) => {
  await sendGroupMessage('🔔🔔🔔🔔🔔5분후 스크럼🔔🔔🔔🔔🔔');
  return res.status(200).send('vote notification success!');
});

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
