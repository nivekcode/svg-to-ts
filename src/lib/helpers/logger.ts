import chalk from 'chalk';

import { DEFAULT_OPTIONS } from '../options/default-options';

export const messagePrefix = 'svg-to-ts:';

export class Logger {
  private static verbose = DEFAULT_OPTIONS.verbose;

  public static changeVisibility(verbose: boolean) {
    Logger.verbose = verbose;
  }

  static printLogo() {
    console.log(chalk.blue(`==========================================================`));
    console.log(chalk.blue(`👷 Hi I am svg-to-ts - let's build an awesome icon library`));
    console.log(chalk.blue(`==========================================================`));
  }

  static generationSuccess(path: string) {
    Logger.logWithPrefix(
      chalk.underline.green(`🏁 Everything is perfect: Icons succesfully generated under ${chalk.blue.underline(path)}`)
    );
  }

  static info(message: string) {
    Logger.logWithPrefix(`ℹ️ ${chalk.blueBright(message)}`);
  }

  static verboseInfo(message: string) {
    if (Logger.verbose) {
      Logger.logWithPrefix(`ℹ️ ${chalk.blueBright(message)}`);
    }
  }

  static error(message: string) {
    Logger.logWithPrefix(chalk.red(message));
  }

  private static logWithPrefix(messageLog: string) {
    console.log(chalk.blue(messagePrefix), messageLog);
  }
}
