import * as fs from 'fs-extra';
import { spawn } from 'child_process';
import { JIRA_ISSUE_INDEX_PATH } from './env';

export const peco = async (
  prompt = 'open',
  filepath = JIRA_ISSUE_INDEX_PATH
): Promise<{ key: string; text: string }> => {
  if (!fs.existsSync(filepath)) {
    throw new Error('notFound');
  }

  return new Promise(resolve => {
    const peco = spawn('peco', [filepath, '--layout=bottom-up', `--prompt=[${prompt}]`]);

    let selected = '';
    peco.stdout.on('data', data => {
      selected += data;
    });

    peco.stdout.on('end', () => {
      if (!selected) {
        // canceled
        process.exit(0);
      }
      const parsed = /\[(.+?)\]/.exec(selected.trim());
      if (!parsed) {
        throw new Error('TODO implement thie error');
      }
      resolve({
        key: parsed[1],
        text: selected.trim(),
      });
    });
  });
};
