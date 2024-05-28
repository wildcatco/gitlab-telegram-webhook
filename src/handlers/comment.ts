import { CommentHookData } from '../types/webhook';
import { sendGroupMessage } from '../utils/bot';
import { generateCommentMessage } from '../utils/messages';
import { getUserFromGitlabId, getUserFromId } from '../utils/users';

export function handleComment(data: CommentHookData) {
  const commentWriterName = getUserFromGitlabId(data.user.username).name;
  const commentUrl = data.object_attributes.url;
  const content = data.object_attributes.note;

  if (data.issue) {
    const issueNumber = data.issue.iid;
    const issueTitle = data.issue.title;

    return sendGroupMessage(
      generateCommentMessage({
        writer: commentWriterName,
        number: issueNumber,
        title: issueTitle,
        url: commentUrl,
        content,
      })
    );
  }

  if (data.merge_request) {
    const author = getUserFromId(data.merge_request.author_id);
    const mrNumber = data.merge_request.iid;
    const mrTitle = data.merge_request.title;

    return sendGroupMessage(
      generateCommentMessage({
        writer: commentWriterName,
        number: mrNumber,
        title: mrTitle,
        url: commentUrl,
        content,
      }),
      author.team === 3
    );
  }
}
