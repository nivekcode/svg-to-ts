import chalk from 'chalk';
import * as util from 'util';
import { Glob } from 'glob';

const getFilesFromRegex = util.promisify(Glob);

export const getFilePathsFromRegex = async (srcFiles: string[]) => {
  const srcFilesRegexExpressions = srcFiles;
  const filePaths: string[] = [];

  for (const regex of srcFilesRegexExpressions) {
    const directoryFiles = await getFilesFromRegex(regex, {
      nodir: true
    });
    if (directoryFiles.length === 0) {
      console.log(chalk.blue.bold('svg-to-ts:'), chalk.yellow(`No matching files for regex: "${regex}"`));
    } else {
      filePaths.push(...directoryFiles);
    }
  }
  return filePaths;
};
