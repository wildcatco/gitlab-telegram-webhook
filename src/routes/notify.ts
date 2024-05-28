import { sendGroupMessage } from '../utils/bot';
import { Router } from 'express';

const router = Router();

router.post('/notify', async (req, res) => {
  const { message, id } = req.body;
  sendGroupMessage(message);
  await db.delete(`/${id}`);
});

export default router;
