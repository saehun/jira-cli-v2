import { handleException, handleRejection } from './lib/exceptionHandler';
import { UnSupportedCommandError } from './lib/errors';
const cmd = process.argv[2];

async function main(): Promise<void> {
  switch (cmd) {
    case 'help':
      break;
    case 'checkout':
      break;
    case 'add':
      break;
    case 'fetch':
      break;
    case 'update':
      break;
    case 'delete':
      break;
    default:
      if (cmd !== '') {
        throw new UnSupportedCommandError(cmd);
      }
      break;
  }
}
process.on('uncaughtException', handleException);
process.on('unhandledRejection', handleRejection);
main();
