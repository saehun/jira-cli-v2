import * as fs from 'fs-extra';
import { Issue } from './model';
import { JIRA_ISSUE_INDEX_PATH } from './env';

export async function saveToFile(issues: Issue[]): Promise<void> {
  await fs.outputFile(JIRA_ISSUE_INDEX_PATH + '.json', JSON.stringify(issues));
  return;
}
