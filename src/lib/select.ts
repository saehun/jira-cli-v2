import * as fs from 'fs-extra';
import { Issue } from './model';
import { peco } from 'node-peco';
import { JIRA_ISSUE_INDEX_PATH } from './env';
import { formatRelative } from './formatRelative';
import { getCurrentBranch } from './git';

function stringifyIssue(issue: Issue, branch: string): string {
  const date = formatRelative(issue.fields.updated);
  const current = issue.key === branch;
  // prettier-ignore
  return `${date}`.padEnd(18, ' ') +
         `${issue.fields.status.name.slice(0, 6)}`.padEnd(8, ' ') + (current ? '* ' : '  ') +
         `[${issue.key}]`.padEnd(14, ' ') +
         `${issue.fields.summary}`
}

export const select = async (prompt = 'open'): Promise<string> => {
  const [issues, branch] = await Promise.all<Issue[], string>([
    fs.readJSON(JIRA_ISSUE_INDEX_PATH + '.json'),
    getCurrentBranch(),
  ]);

  const [selected] = await peco(
    issues.map(i => stringifyIssue(i, branch)),
    {
      layout: 'bottom-up',
      prompt,
    }
  );

  if (!selected) {
    process.exit(0);
  }

  const parsed = /\[(.+?)\]/.exec(selected.trim());
  if (!parsed) {
    throw new Error('TODO implement thie error');
  }

  return parsed[1];
};
