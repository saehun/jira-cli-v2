import { exec } from 'child_process';

export async function getCurrentBranch(): Promise<string> {
  return new Promise(resolve => {
    exec('git branch --show-current', (error, result) => {
      if (error) {
        resolve('nil');
      } else {
        resolve(result.trim());
      }
    });
  });
}
