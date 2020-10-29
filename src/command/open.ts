import { select } from '../lib/select';
import { JIRA_ENDPOINT } from '../lib/env';
import * as open from 'open';

async function command(): Promise<void> {
  const key = await select('open');
  const url = `${JIRA_ENDPOINT}/browse/${key}`;
  open(url);
}

export default command;
