import TelegramBot from 'node-telegram-bot-api';
import { USER_INFO } from '../data/user_info';
import { User } from '../types/user';

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

export function sendGroupMessage(
  message: string,
  { sendToTeam3 }: { sendToTeam3: boolean } = { sendToTeam3: false }
) {
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
  user,
  message,
}: {
  user: User;
  message: string;
}) {
  const privateBot = privateBots[user.name];
  if (user.chatId) {
    privateBot.sendMessage(user.chatId, message, {
      disable_web_page_preview: true,
    });
  }
}

export function sendToMentionedUser(message: string) {
  const pattern = /@\w+/g;
  const matches = message.match(pattern);
  if (!matches) {
    return;
  }

  const usernames = USER_INFO.filter((user) => !!user.token).map(
    (user) => user.username
  );
  matches.forEach((match) => {
    const username = match.replace('@', '');
    if (usernames.includes(username)) {
      const user = USER_INFO.find((user) => user.username === username);
      if (user) {
        sendPrivateMessage({
          user,
          message,
        });
      }
    }
  });
}
