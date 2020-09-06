import * as fs from 'fs-extra';
import { Issue } from './model';
import { formatRelative } from 'date-fns';
import { ko } from 'date-fns/locale';
import { JIRA_ISSUE_INDEX_PATH } from './env';

function stringifyIssue(issue: Issue): string {
  const date = formatRelative(new Date(issue.fields.updated), new Date(), {
    locale: ko,
  });
  // prettier-ignore
  return `${date}`.padEnd(10, ' ') +
         `${issue.fields.status.name}`.padEnd(10, ' ') +
         `[${issue.key}]`.padEnd(13, ' ') +
         `${issue.fields.summary}`
}

export async function saveToFile(issues: Issue[]): Promise<void> {
  const index = issues.map(stringifyIssue).join('\n');
  await fs.outputFile(JIRA_ISSUE_INDEX_PATH, index);
  return;
}
