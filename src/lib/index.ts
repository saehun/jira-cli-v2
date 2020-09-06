import { peco } from './peco';
import { JIRA_ISSUE_INDEX_PATH } from './env';
import { getIssues } from './api';
const cmd = process.argv[2];

async function main(): Promise<void> {
  switch (cmd) {
    case 'help':
      break;
    case 'checkout':
      break;
    case 'add':
      break;
    case 'fetch':
      break;
    case 'update':
      break;
    case 'delete':
      break;
    default:
      break;
  }
}

main();