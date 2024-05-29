import { CommentHookData } from '../types/webhook';
import { sendGroupMessage } from '../utils/bot';
import { generateCommentMessage } from '../utils/messages';
import { getUserFromUsername, getUserFromId } from '../utils/users';

export function handleComment(data: CommentHookData) {
  const writerName = getUserFromUsername(data.user.username).name;
  const url = data.object_attributes.url;
  const content = data.object_attributes.note;

  if (data.issue) {
    const issueNumber = data.issue.iid;
    const issueTitle = data.issue.title;
    const message = generateCommentMessage({
      writer: writerName,
      number: issueNumber,
      title: issueTitle,
      url: url,
      content,
    });

    return sendGroupMessage(message);
  }

  if (data.merge_request) {
    const author = getUserFromId(data.merge_request.author_id);
    const mrNumber = data.merge_request.iid;
    const mrTitle = data.merge_request.title;
    const message = generateCommentMessage({
      writer: writerName,
      number: mrNumber,
      title: mrTitle,
      url: url,
      content,
    });

    return sendGroupMessage(message);
  }
}
