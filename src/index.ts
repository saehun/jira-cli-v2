import * as fs from 'fs-extra';
import { peco } from './peco';
import { JIRA_ISSUE_INDEX_PATH } from './env';
import { Issue } from './model';

function stringifyIssue(issue: Issue): string {
  console.log(issue);
  // prettier-ignore
  return `${issue.fields.status.name}`.padEnd(10, ' ') +
         `[${issue.key}]`.padEnd(13, ' ') +
         `${issue.fields.summary}`;
}

async function saveToFile(issues: Issue[]): Promise<void> {
  const index = issues.map(stringifyIssue).join('\n');
  console.log(index);
  await fs.outputFile(JIRA_ISSUE_INDEX_PATH, index);
  return;
}

async function main(): Promise<void> {
  // const { issues } = await getIssues();
  // await saveToFile(issues);
  const line = await peco(JIRA_ISSUE_INDEX_PATH);
  console.log(line);
}

main();
