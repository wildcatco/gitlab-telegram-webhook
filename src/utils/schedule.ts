import schedule from 'node-schedule';
import { getNotifications } from '../db';
import { sendGroupMessage } from './bot';

export async function updateSchedule() {
  Object.values(schedule.scheduledJobs).forEach((job) => {
    schedule.cancelJob(job);
  });

  const notifications = await getNotifications();
  notifications.map(({ id, message, year, month, date, hour, minute }) => {
    schedule.scheduleJob(new Date(year, month - 1, date, hour, minute), () => {
      sendGroupMessage(message);
      db.delete(`/${id}`);
    });
  });
}
