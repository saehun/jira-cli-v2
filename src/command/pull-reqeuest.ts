// https://github.com/minidonut/dotemacs/compare/m1x?expand=1
import * as execa from 'execa';
import { getIssueFromLocalIndex } from '../lib/api';
import { writeSync } from 'clipboardy';
import * as open from 'open';

async function command(): Promise<void> {
  const { stdout: branchName } = await execa('git', ['branch', '--show-current']).catch(e => {
    console.log(e.stderr);
    process.exit(0);
  });

  const issue = await getIssueFromLocalIndex(branchName.replace(/^\w+\//, ''));
  const repositoryUrl = await currentRepositoryUrl();
  const [scope, ...rest] = issue.fields.summary.split(' ');
  writeSync(`feat(${scope}): ` + rest.join(' ') + ` [${issue.key}]`);
  open(`${repositoryUrl}/compare/${branchName}?expand=1`);
}

export default command;

// TODO: move to utils
async function currentRepositoryUrl(): Promise<string> {
  let { stdout: url } = await execa('git', ['ls-remote', '--get-url']);
  if (url.startsWith('ssh://git@')) {
    url = url.replace('ssh://git@', 'https://');
  }
  return url.replace(/\.git$/, '');
}
