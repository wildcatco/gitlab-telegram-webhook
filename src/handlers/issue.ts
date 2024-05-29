import { IssueHookData } from '../types/webhook';
import { sendGroupMessage } from '../utils/bot';
import {
  generateIssueClosedMessage,
  generateIssueOpenedMessage,
} from '../utils/messages';
import { getUserFromUsername } from '../utils/users';

export function handleIssue(data: IssueHookData) {
  const action = data.object_attributes.action;
  switch (action) {
    case 'open':
    case 'reopen': {
      const issueCreator = getUserFromUsername(data.user.username).name;
      const number = data.object_attributes.id;
      const title = data.object_attributes.title;
      const url = data.object_attributes.url;
      const assignees = data.assignees?.map(
        (a) => getUserFromUsername(a.username).name
      );
      const message = generateIssueOpenedMessage({
        creator: issueCreator,
        title,
        number,
        assignees,
        url,
      });

      return sendGroupMessage(message);
    }
    case 'close': {
      const issueCreator = getUserFromUsername(data.user.username).name;
      const number = data.object_attributes.id;
      const title = data.object_attributes.title;
      const url = data.object_attributes.url;
      const message = generateIssueClosedMessage({
        creator: issueCreator,
        title,
        number,
        url,
      });

      return sendGroupMessage(message);
    }
  }
}
