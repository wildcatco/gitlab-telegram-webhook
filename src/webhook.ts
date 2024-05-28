import { handleComment } from './handlers/comment';
import { handleIssue } from './handlers/issue';
import { handleMergeRequest } from './handlers/merge_request';
import {
  WebhookData,
  IssueHookData,
  MergeRequestHookData,
  CommentHookData,
  WebhookEvent,
} from './types/webhook';

export function handleWebhook(event: WebhookEvent, data: WebhookData) {
  switch (event) {
    case 'Merge Request Hook':
      return handleMergeRequest(data as MergeRequestHookData);
    case 'Issue Hook':
      return handleIssue(data as IssueHookData);
    case 'Note Hook':
      return handleComment(data as CommentHookData);
  }
}
