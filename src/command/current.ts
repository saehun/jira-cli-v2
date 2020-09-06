import * as execa from 'execa';
import * as chalk from 'chalk';
import { leftbox, box } from '../lib/box';
import { getIssue } from '../lib/api';
import { JIRA_ENDPOINT } from '../lib/env';
import { formatRelative } from '../lib/formatRelative';

async function command(): Promise<void> {
  let branch = '';
  try {
    ({ stdout: branch } = await execa('git', ['branch', '--show-current']));
  } catch (e) {
    console.log(e.stderr);
    process.exit(0);
  }

  if (!/^[A-Z]+-[0-9]+/.test(branch)) {
    console.log(box(`'${chalk.yellowBright(branch)}' doesn't follow jira issue format`));
    process.exit(0);
  }

  const issue = await getIssue(branch);

  const key = branch;
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

export default command;
