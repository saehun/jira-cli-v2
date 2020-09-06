import { handleException, handleRejection } from './lib/exceptionHandler';
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
        throw new Error();
      }
      break;
  }
}
process.on('uncaughtException', handleException);
process.on('unhandledRejection', handleRejection);
main();
