import * as fs from 'fs-extra';
import { spawn } from 'child_process';

export const peco = async (filepath: string, prompt = 'open'): Promise<string> => {
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
      resolve(selected.trim());
    });
  });
};
