import { Router } from 'express';
import { handleWebhook } from '../webhook';
import { WebhookData, WebhookEvent } from '../types/webhook';

const router = Router();

router.post('/', (req, res) => {
  if (process.env.SECRET !== req.header('X-Gitlab-Token')) {
    return res.status(400).send('Not valid request');
  }

  const event = req.header('X-Gitlab-Event') as WebhookEvent;
  const data = req.body as WebhookData;

  handleWebhook(event, data)
    ?.then(() => res.status(202).send('Success!'))
    .catch(() => {});
});

export default router;
