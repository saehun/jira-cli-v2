import { handleException, handleRejection } from './lib/exceptionHandler';
import { UnSupportedCommandError } from './lib/errors';
const cmd = process.argv[2];

async function main(): Promise<void> {
  switch (cmd) {
    case null:
    case undefined:
      require('./command/list').default();
      break;
    case '-h':
    case '--help':
    case 'help':
      require('./command/help').default();
      break;
    case 'checkout':
      require('./command/checkout').default();
      break;
    case 'add':
      require('./command/add').default();
      break;
    case 'fetch':
      require('./command/fetch').default();
      break;
    case 'update':
      require('./command/update').default();
      break;
    case 'delete':
      require('./command/delete').default();
      break;
    case 'current':
      require('./command/current').default();
      break;
    case 'commit':
      require('./command/commit').default();
      break;
    case 'open':
      require('./command/open').default();
      break;
    case 'pr':
      require('./command/pull-reqeuest').default();
      break;
    default:
      throw new UnSupportedCommandError(cmd);
  }
}
process.on('uncaughtException', handleException);
process.on('unhandledRejection', handleRejection);
main();
