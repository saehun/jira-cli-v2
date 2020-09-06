import * as os from 'os';
import * as path from 'path';
/**
 * PUT below in .zshrc
 * export JIRA_API_TOKEN=XXXXXXXXXXXXXXX
 * export JIRA_EMAIL=your@email
 * export JIRA_PROJECT_KEY=XXXX
 * export JIRA_API_ENDPOINT=https://xxx.atlassian.net
 */
// prettier-ignore

export const {
  JIRA_API_TOKEN,
  JIRA_EMAIL,
  JIRA_PROJECT_KEY,
  JIRA_ENDPOINT
} = process.env;
export const JIRA_AUTH = JIRA_EMAIL + ':' + JIRA_API_TOKEN;
export const JIRA_ISSUE_INDEX_PATH = path.join(os.homedir(), '.cache', 'jira', JIRA_PROJECT_KEY);
