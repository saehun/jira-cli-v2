import { handleException, handleRejection } from './lib/exceptionHandler';
import { UnSupportedCommandError } from './lib/errors';
const cmd = process.argv[2];

async function main(): Promise<void> {
  switch (cmd) {
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
    default:
      if (cmd == null) {
        require('./command/list').default();
      } else {
        throw new UnSupportedCommandError(cmd);
      }
  }
}
process.on('uncaughtException', handleException);
process.on('unhandledRejection', handleRejection);
main();
