import { select } from '../lib/select';
async function command(): Promise<void> {
  const key = await select('open');
  require('../lib/print').printIssue(key);
}

export default command;
