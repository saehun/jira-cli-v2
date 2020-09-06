import { peco } from './peco';
import { JIRA_ISSUE_INDEX_PATH } from './env';

async function main(): Promise<void> {
  // const { issues } = await getIssues();
  // await saveToFile(issues);
  const line = await peco(JIRA_ISSUE_INDEX_PATH);
  console.log(line);
}

main();
