import * as execa from 'execa';
import { peco } from '../lib/peco';

async function command(): Promise<void> {
  try {
    const { stdout } = await execa('git', ['status']);
    if (!stdout.includes('working tree clean')) {
      console.log(stdout);
      console.log(`
commit or stash to clear working tree first 😔
`);
      process.exit(0);
    }
  } catch (e) {
    console.log(e.stderr);
    process.exit(0);
  }

  const { key } = await peco('checkout');
  try {
    await execa('git', ['checkout', '-b', key]);
  } catch (e) {
    if (e.stderr.includes('already exists')) {
      await execa('git', ['checkout', key]);
    } else {
      console.log(e.stderr);
    }
  }
}

export default command;
