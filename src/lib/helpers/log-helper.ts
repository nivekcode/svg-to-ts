import chalk from 'chalk';

const messagePrefix = 'svg-to-ts: ';

export const success = (message: string) => logWithPrefix(chalk.green(message));
export const info = (message: string) => logWithPrefix(chalk.yellow(message));
export const error = (message: string) => logWithPrefix(chalk.red(message));
export const underlineSuccess = (message: string) => chalk.green.underline(message);

const logWithPrefix = (messageLog: string) => console.log(chalk.blue(messagePrefix), messageLog);
