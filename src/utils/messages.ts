import dedent from 'dedent';

export function generateIssueOpenedMessage({
  creator,
  number,
  title,
  assignees,
  url,
}: {
  creator: string;
  number: number;
  title: string;
  assignees?: string[];
  url: string;
}) {
  return dedent`
    [🤦‍ISSUE OPENED] ${creator}
    #${number} ${title}
    assignees: ${
      assignees && assignees.length > 0 ? assignees.join(', ') : '없음'
    }
    ${url}
    `;
}

export function generateIssueClosedMessage({
  creator,
  number,
  title,
  url,
}: {
  creator: string;
  number: number;
  title: string;
  url: string;
}) {
  return dedent`
    [💪ISSUE CLOSED] ${creator}
    #${number} ${title}
    ${url}
    `;
}

export function generateReviewerAssignedMessage({
  creator,
  number,
  title,
  url,
}: {
  creator: string;
  number: number;
  title: string;
  url: string;
}) {
  return dedent`
    [🤘리뷰 요청] ${creator}
    #${number} ${title}
    ${url}
    `;
}

export function generateMergedMessage({
  creator,
  number,
  title,
  url,
}: {
  creator: string;
  number: number;
  title: string;
  url: string;
}) {
  return dedent`
    [🚀MERGED] ${creator}
    #${number} ${title}
    ${url}
    `;
}

export function generateApprovedMessage({
  reviewer,
  number,
  title,
  url,
}: {
  reviewer: string;
  number: number;
  title: string;
  url: string;
}) {
  return dedent`
    [🙆‍리뷰승인] ${reviewer}
    #${number} ${title}
    ${url}
    `;
}

export function generateMrCreateMessage({
  creator,
  number,
  title,
  url,
}: {
  creator: string;
  number: number;
  title: string;
  url: string;
}) {
  return dedent`
    [✍️PR] ${creator}
    #${number} ${title}
    ${url}
    `;
}

export function generateCommentMessage({
  writer,
  number,
  title,
  url,
  content,
}: {
  writer: string;
  number: number;
  title: string;
  url: string;
  content: string;
}) {
  return dedent`
    [💬COMMENT] ${writer}
    #${number} ${title}
    ${url}
    ${content}
    `;
}
