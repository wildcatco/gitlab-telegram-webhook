import { USER_INFO } from '../data/user_info';

export function getUserFromGitlabId(gitlabId: string) {
  const user = USER_INFO.find((user) => user.gitlabId === gitlabId);
  if (!user) {
    throw new Error(
      `유저 목록에 해당 Gitlab id가(${gitlabId}) 존재하지 않습니다.`
    );
  }
  return user;
}

export function getUserFromId(id: number) {
  const user = USER_INFO.find((u) => u.id === id);
  if (!user) {
    throw new Error(`유저 목록에 해당 id가(${id}) 존재하지 않습니다.`);
  }
  return user;
}
