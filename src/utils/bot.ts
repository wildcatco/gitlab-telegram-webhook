import TelegramBot from 'node-telegram-bot-api';
import { USER_INFO } from '../data/user_info';

const groupChatId = process.env.GROUP_CHAT_ID!;
const groupToken = process.env.GROUP_TOKEN!;

const team3GroupChatId = process.env.TEAM3_GROUP_CHAT_ID!;
const team3GroupToken = process.env.TEAM3_GROUP_TOKEN!;

const groupBot = new TelegramBot(groupToken);
const team3GroupBot = new TelegramBot(team3GroupToken);

const privateBots: Record<string, TelegramBot> = {};
USER_INFO.forEach((user) => {
  if (user.token) {
    privateBots[user.name] = new TelegramBot(user.token);
  }
});

export function sendGroupMessage(message: string, sendToTeam3 = false) {
  sendToMentionedUser(message);

  return Promise.all([
    groupBot.sendMessage(groupChatId, message, {
      disable_web_page_preview: true,
    }),
    sendToTeam3 &&
      team3GroupBot.sendMessage(team3GroupChatId, message, {
        disable_web_page_preview: true,
      }),
  ]);
}

export async function sendPrivateMessage({
  name,
  message,
}: {
  name: string;
  message: string;
}) {
  const privateBot = privateBots[name];
  const user = USER_INFO.find((user) => user.name === name);
  if (!user || !user.chatId) {
    throw new Error('유저 정보를 찾을 수 없습니다.');
  }

  privateBot.sendMessage(user.chatId, message, {
    disable_web_page_preview: true,
  });
}

export function sendToMentionedUser(message: string) {
  const pattern = /@\w+/g;
  const matches = message.match(pattern);
  if (!matches) {
    return;
  }

  const gitlabIds = USER_INFO.filter((user) => !!user.token).map(
    (user) => user.gitlabId
  );
  matches.forEach((match) => {
    const gitlabId = match.replace('@', '');
    if (gitlabIds.includes(gitlabId)) {
      const user = USER_INFO.find((user) => user.gitlabId === gitlabId);
      if (user) {
        sendPrivateMessage({
          name: user.name,
          message,
        });
      }
    }
  });
}
