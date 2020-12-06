import { Glob } from 'glob';
import * as util from 'util';

import { Logger } from './logger';

const getFilesFromRegex = util.promisify(Glob);

export const getFilePathsFromRegex = async (srcFiles: string[]) => {
  const srcFilesRegexExpressions = srcFiles;
  const filePaths: string[] = [];

  for (const regex of srcFilesRegexExpressions) {
    const directoryFiles = await getFilesFromRegex(regex, {
      nodir: true
    });
    if (directoryFiles.length === 0) {
      Logger.verboseInfo(`No matching files for regex: "${regex}"`);
    } else {
      filePaths.push(...directoryFiles);
    }
  }
  return filePaths;
};
