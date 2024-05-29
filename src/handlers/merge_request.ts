import { MergeRequestHookData } from '../types/webhook';
import { sendGroupMessage, sendPrivateMessage } from '../utils/bot';
import {
  generateApprovedMessage,
  generateMergedMessage,
  generateMrCreateMessage,
  generateReviewerAssignedMessage,
} from '../utils/messages';
import { getUserFromUsername, getUserFromId } from '../utils/users';

export function handleMergeRequest(data: MergeRequestHookData) {
  const action = data.object_attributes.action;

  switch (action) {
    case 'open':
    case 'reopen': {
      const user = getUserFromUsername(data.user.username);
      const mrCreatorName = user.name;
      const mrNumber = data.object_attributes.iid;
      const mrTitle = data.object_attributes.title;
      const mrUrl = data.object_attributes.url;

      const message = generateMrCreateMessage({
        creator: mrCreatorName,
        number: mrNumber,
        title: mrTitle,
        url: mrUrl,
      });
      return sendGroupMessage(message);
    }

    case 'update': {
      const user = getUserFromUsername(data.user.username);
      const mrCreatorName = user.name;
      const mrNumber = data.object_attributes.iid;
      const mrTitle = data.object_attributes.title;
      const mrUrl = data.object_attributes.url;
      const newReviewers = [];
      if (data.changes.reviewers) {
        const previous = data.changes.reviewers.previous;
        const current = data.changes.reviewers.current;

        newReviewers.push(...current.filter((r) => !previous.includes(r)));
      }
      if (data.changes.assignees) {
        const previous = data.changes.assignees.previous;
        const current = data.changes.assignees.current;

        newReviewers.push(...current.filter((r) => !previous.includes(r)));
      }

      const promises: Promise<void>[] = [];
      newReviewers.forEach((reviewer) => {
        const user = getUserFromId(reviewer.id);
        const message = generateReviewerAssignedMessage({
          creator: mrCreatorName,
          number: mrNumber,
          title: mrTitle,
          url: mrUrl,
        });
        promises.push(
          sendPrivateMessage({
            user,
            message,
          }),
        );
      });

      return Promise.all(promises);
    }

    case 'merge': {
      const user = getUserFromUsername(data.user.username);
      const mrCreatorName = user.name;
      const mrNumber = data.object_attributes.iid;
      const mrTitle = data.object_attributes.title;
      const mrUrl = data.object_attributes.url;

      const message = generateMergedMessage({
        creator: mrCreatorName,
        number: mrNumber,
        title: mrTitle,
        url: mrUrl,
      });
      return sendGroupMessage(message);
    }

    case 'approved': {
      const mrNumber = data.object_attributes.iid;
      const reviewer = getUserFromUsername(data.user.username).name;
      const mrTitle = data.object_attributes.title;
      const mrUrl = data.object_attributes.url;

      const message = generateApprovedMessage({
        reviewer,
        number: mrNumber,
        title: mrTitle,
        url: mrUrl,
      });
      return sendGroupMessage(message);
    }
  }
}
