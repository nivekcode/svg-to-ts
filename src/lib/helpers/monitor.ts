import chalk from 'chalk';
import ora from 'ora';

import { Logger, messagePrefix } from './logger';

export const generateSpinner = (text?: string) =>
  ora({ text, spinner: 'christmas', prefixText: chalk.blue(messagePrefix) });

export const callAndMonitorAsync = async <T>(fn: (...args: any) => Promise<T>, spinnerMessage: string): Promise<T> => {
  const spinner = generateSpinner(spinnerMessage);
  try {
    const result = await fn();
    spinner.succeed();
    return result;
  } catch (exception) {
    spinner.fail();
    Logger.error(exception);
    process.exit(1);
  }
};

export const callAndMonitor = <T>(fn: (...args: any) => T, spinnerMessage: string): T => {
  const spinner = generateSpinner(spinnerMessage);
  try {
    const result = fn();
    spinner.succeed();
    return result;
  } catch (exception) {
    spinner.fail();
    Logger.error(exception);
    process.exit(1);
  }
};
