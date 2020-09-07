import { peco } from '../lib/peco';
async function command(): Promise<void> {
  const { key } = await peco('open');
  require('../lib/print').printIssue(key);
}

export default command;
