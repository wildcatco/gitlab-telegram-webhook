import cron from 'node-cron';
import { sendGroupMessage } from './bot';

export function registerCronJobs() {
  // 우수연구원 투표 (월요일 오전 10시)
  cron.schedule('0 0 10 * * 1', () => {
    sendGroupMessage(
      '🔔🔔🔔🔔🔔12시까지 우수연구원 투표 https://vote-jade.vercel.app/vote🔔🔔🔔🔔🔔'
    );
  });

  // 주간 보고서 작성 (금요일 오후 4시)
  cron.schedule('0 0 16 * * 5', () => {
    sendGroupMessage('🔔🔔🔔🔔🔔퇴근 전 주간보고 작성🔔🔔🔔🔔🔔');
  });

  // 스크럼 (월요일 오후 2시 55분)
  cron.schedule('0 55 14 * * 1', () => {
    sendGroupMessage('🔔🔔🔔🔔🔔5분후 스크럼🔔🔔🔔🔔🔔');
  });

  // 스크럼 (목요일 오전 10시 35분)
  cron.schedule('0 35 10 * * 4', () => {
    sendGroupMessage('🔔🔔🔔🔔🔔5분후 스크럼🔔🔔🔔🔔🔔');
  });
}
