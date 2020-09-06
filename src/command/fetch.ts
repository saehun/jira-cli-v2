import { getIssues } from '../lib/api';
import { box } from '../lib/box';
import * as chalk from 'chalk';
import { saveToFile } from '../lib/io';

async function command(): Promise<void> {
  const { issues } = await getIssues();
  await saveToFile(issues);

  console.log(box(`${chalk.greenBright(issues.length)} issues fetched`));
}

export default command;
