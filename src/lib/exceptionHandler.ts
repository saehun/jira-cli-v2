import { BaseError } from './errors';
export function handleException(e: Error): void {
  if (e instanceof BaseError) {
    console.error(e.message);
    process.exit(1);
  } else {
    // unhandled;
    throw e;
  }
}

export function handleRejection(e: Error): void {
  // catch promise rejection to exception handler
  throw e;
}
