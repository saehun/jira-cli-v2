import * as chalk from 'chalk';
import { box } from './box';

export class BaseError extends Error {}

export class UnSupportedCommandError extends BaseError {
  command: string;

  constructor(command: string) {
    super();
    this.command = command;
    this.name = this.constructor.name;
  }

  get message(): string {
    return box(`Command '${chalk.greenBright(this.command)}' is not supported 😔

try 'jira help'`);
  }
}
