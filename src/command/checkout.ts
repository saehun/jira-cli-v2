import * as execa from 'execa';
import { select } from '../lib/select';

async function command(): Promise<void> {
  try {
    await execa('git', ['status']);
  } catch (e) {
    console.log(e.stderr);
    process.exit(0);
  }
  const current = (await execa('git', ['branch', '--show-current'])).stdout;

  const key = await select(`checkout from ${current}`);
  try {
    await execa('git', ['checkout', '-b', generateBranchName(key)]);
  } catch (e) {
    if (e.stderr.includes('already exists')) {
      await execa('git', ['checkout', key]);
    } else {
      console.log(e.stderr);
    }
  }

  function generateBranchName(key: string): string {
    const prefix = process.argv[3];
    if (prefix === 'dev') {
      return `dev/${key}`;
    }
    return key;
  }
}

export default command;
