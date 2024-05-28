export type WebhookEvent = 'Merge Request Hook' | 'Issue Hook' | 'Note Hook';

type User = {
  id: number;
  name: string;
  username: string;
  avatar_url: string;
};

export type MergeRequestHookData = {
  user: User;
  object_attributes: {
    iid: number;
    title: string;
    url: string;
    assignee_ids: number[];
    reviewer_ids: number[];
    action:
      | 'open'
      | 'close'
      | 'reopen'
      | 'update'
      | 'approved'
      | 'unapproved'
      | 'approval'
      | 'unapproval'
      | 'merge';
  };
  changes: {
    reviewers?: {
      previous: User[];
      current: User[];
    };
    assignees?: {
      previous: User[];
      current: User[];
    };
  };
};

export type IssueHookData = {
  user: User;
  assignees?: User[];
  object_attributes: {
    id: number;
    title: string;
    url: string;
    action: 'open' | 'close' | 'reopen' | 'update';
  };
};

export type CommentHookData = {
  user: User;
  object_attributes: {
    url: string;
    note: string;
  };
  issue?: {
    iid: number;
    title: string;
  };
  merge_request?: {
    iid: number;
    title: string;
    author_id: number;
  };
};

export type WebhookData =
  | MergeRequestHookData
  | IssueHookData
  | CommentHookData;
