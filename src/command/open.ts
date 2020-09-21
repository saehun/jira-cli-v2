import { peco } from '../lib/peco';
import { JIRA_ENDPOINT } from '../lib/env';
import * as open from 'open';

async function command(): Promise<void> {
  const { key } = await peco('open');
  const url = `${JIRA_ENDPOINT}/browse/${key}`;
  open(url);
}

export default command;
