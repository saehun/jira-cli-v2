import { peco } from '../lib/peco';
import { printIssue } from '../lib/print';
async function command(): Promise<void> {
  const { key } = await peco('open');
  await printIssue(key);
}

export default command;
