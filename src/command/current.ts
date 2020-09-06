import * as execa from 'execa';
import * as chalk from 'chalk';
import { box } from '../lib/box';
import { printIssue } from '../lib/print';

async function command(): Promise<void> {
  let key = '';
  try {
    ({ stdout: key } = await execa('git', ['branch', '--show-current']));
  } catch (e) {
    console.log(e.stderr);
    process.exit(0);
  }

  if (!/^[A-Z]+-[0-9]+/.test(key)) {
    console.log(box(`branch '${chalk.yellowBright(key)}' doesn't follow jira issue format`));
    process.exit(0);
  }

  printIssue(key);
}

export default command;
