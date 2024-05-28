import { IssueHookData } from '../types/webhook';
import { sendGroupMessage } from '../utils/bot';
import {
  generateIssueClosedMessage,
  generateIssueOpenedMessage,
} from '../utils/messages';
import { getUserFromGitlabId } from '../utils/users';

export function handleIssue(data: IssueHookData) {
  const action = data.object_attributes.action;
  switch (action) {
    case 'open':
    case 'reopen': {
      const issueCreator = getUserFromGitlabId(data.user.username).name;
      const number = data.object_attributes.id;
      const title = data.object_attributes.title;
      const url = data.object_attributes.url;
      const assignees = data.assignees?.map(
        (a) => getUserFromGitlabId(a.username).name
      );

      return sendGroupMessage(
        generateIssueOpenedMessage({
          creator: issueCreator,
          title,
          number,
          assignees,
          url,
        })
      );
    }
    case 'close': {
      const issueCreator = getUserFromGitlabId(data.user.username).name;
      const number = data.object_attributes.id;
      const title = data.object_attributes.title;
      const url = data.object_attributes.url;

      return sendGroupMessage(
        generateIssueClosedMessage({
          creator: issueCreator,
          title,
          number,
          url,
        })
      );
    }
  }
}
