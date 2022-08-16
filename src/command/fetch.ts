import { JIRA_PROJECT_KEYS } from '../lib/env';
import { getIssues } from '../lib/api';
import { box } from '../lib/box';
import * as chalk from 'chalk';
import { saveToFile } from '../lib/io';
import { Issue } from '../lib/model';

async function command(): Promise<void> {
  const fetchedIssues: Issue[] = [];
  for (const projectKey of JIRA_PROJECT_KEYS) {
    const { issues } = await getIssues(projectKey);
    fetchedIssues.push(...issues);
  }

  fetchedIssues.sort((issueA, issueB) => {
    return Number(new Date(issueA.fields.created)) < Number(new Date(issueB.fields.created)) ? 1 : -1;
  });
  await saveToFile(fetchedIssues);

  console.log(box(`${chalk.greenBright(fetchedIssues.length)} issues fetched`));
}

export default command;
