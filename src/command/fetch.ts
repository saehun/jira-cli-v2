import { getIssues } from '../lib/api';
import { saveToFile } from '../lib/io';
async function command(): Promise<void> {
  const { issues } = await getIssues();
  await saveToFile(issues);
}

export default command;
