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
      const hasAssignee = data.object_attributes.assignee_ids.length;
      const hasReviewer = data.object_attributes.reviewer_ids.length;
      const assignee = hasAssignee
        ? getUserFromId(data.object_attributes.assignee_ids[0])
        : null;
      const reviewer = hasReviewer
        ? getUserFromId(data.object_attributes.reviewer_ids[0])
        : null;

      if (assignee) {
        sendPrivateMessage({
          name: assignee.name,
          message: generateReviewerAssignedMessage({
            creator: mrCreatorName,
            number: mrNumber,
            title: mrTitle,
            url: mrUrl,
          }),
        });
      }

      if (reviewer) {
        sendPrivateMessage({
          name: reviewer.name,
          message: generateReviewerAssignedMessage({
            creator: mrCreatorName,
            number: mrNumber,
            title: mrTitle,
            url: mrUrl,
          }),
        });
      }

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
        promises.push(
          sendPrivateMessage({
            name: getUserFromUsername(reviewer.username).name,
            message: generateReviewerAssignedMessage({
              creator: mrCreatorName,
              number: mrNumber,
              title: mrTitle,
              url: mrUrl,
            }),
          })
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
