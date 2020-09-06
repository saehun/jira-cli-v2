import * as execa from 'execa';
import * as chalk from 'chalk';
import { box } from '../lib/box';

const commitMessage = process.argv[3];
async function command(): Promise<void> {
  if (!commitMessage) {
    console.log('enter commit messsage');
    process.exit(0);
  }
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

  try {
    await execa('git', ['commit', '-m', `[${branch}] ${commitMessage}`], { stdio: 'inherit' });
  } catch (e) {
    console.log(e.stderr);
  }
}

export default command;
