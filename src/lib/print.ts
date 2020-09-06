import * as chalk from 'chalk';
import { leftbox } from '../lib/box';
import { getIssue } from '../lib/api';
import { JIRA_ENDPOINT } from '../lib/env';
import { formatRelative } from '../lib/formatRelative';

export async function printIssue(key: string): Promise<void> {
  const issue = await getIssue(key);

  const summary = issue.fields.summary;
  const created = formatRelative(issue.fields.created);
  const updated = formatRelative(issue.fields.updated);
  const status = issue.fields.status.name;
  const reporter = issue.fields.reporter.displayName;
  const url = `${JIRA_ENDPOINT}/browse/${key}`;

  console.log(
    leftbox(`key      = ${chalk.yellowBright(key)}
summary  = ${chalk.whiteBright(summary)}
created  = ${chalk.gray(created)}
updated  = ${chalk.gray(updated)}
status   = ${chalk.greenBright(status)}
reporter = ${chalk.greenBright(reporter)}
url      = ${chalk.blueBright(url)}`)
  );
}
