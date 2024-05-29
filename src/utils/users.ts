import { USER_INFO } from '../data/user_info';

export function getUserFromUsername(username: string) {
  const user = USER_INFO.find((user) => user.username === username);
  if (!user) {
    throw new Error(
      `유저 목록에 해당 Gitlab id가(${username}) 존재하지 않습니다.`
    );
  }
  return user;
}

export function getUserFromId(id: number) {
  const user = USER_INFO.find((user) => user.id === id);
  if (!user) {
    throw new Error(`유저 목록에 해당 id가(${id}) 존재하지 않습니다.`);
  }
  return user;
}
