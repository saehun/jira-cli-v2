import { default as axios } from 'axios';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs-extra';
import { peco } from './peco';

/**
 * PUT below in .zshrc
 * export JIRA_API_TOKEN=XXXXXXXXXXXXXXX
 * export JIRA_EMAIL=your@email
 * export JIRA_PROJECT_KEY=XXXX
 * export JIRA_API_ENDPOINT=https://xxx.atlassian.net/rest/api/3
 */
// prettier-ignore

const {
  JIRA_API_TOKEN,
  JIRA_EMAIL,
  JIRA_PROJECT_KEY,
  JIRA_API_ENDPOINT
} = process.env;
const JIRA_AUTH = JIRA_EMAIL + ':' + JIRA_API_TOKEN;
const JIRA_ISSUE_INDEX_PATH = path.join(os.homedir(), '.cache', 'jira', JIRA_PROJECT_KEY);

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
