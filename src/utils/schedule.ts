import schedule from 'node-schedule';
import { URL } from '../constants/url';
import { getNotifications } from '../db';

export async function updateSchedule() {
  Object.values(schedule.scheduledJobs).forEach((job) => {
    schedule.cancelJob(job);
  });

  const notifications = await getNotifications();
  notifications.map(({ id, message, year, month, date, hour, minute }) => {
    schedule.scheduleJob(new Date(year, month - 1, date, hour, minute), () => {
      fetch(`${URL}/notify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, id }),
      });
    });
  });
}
