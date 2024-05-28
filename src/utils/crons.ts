import cron from 'node-cron';
import { URL } from '../constants/url';

export function registerCronJobs() {
  // 우수연구원 투표 (월요일 오전 10시)
  cron.schedule('0 0 10 * * 1', () => {
    fetch(`${URL}/notification/vote`);
  });

  // 주간 보고서 작성 (금요일 오후 4시)
  cron.schedule('0 0 16 * * 5', () => {
    fetch(`${URL}/notification/weekly-report`);
  });

  // 스크럼 (월요일 오후 2시 55분)
  cron.schedule('0 55 14 * * 1', () => {
    fetch(`${URL}/notification/scrum`);
  });

  // 스크럼 (목요일 오전 10시 35분)
  cron.schedule('0 35 10 * * 4', () => {
    fetch(`${URL}/notification/scrum`);
  });
}
