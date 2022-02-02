import { Logger } from '../../helpers/logger';
import { FileConversionOptions } from '../conversion-options';

import { collectCommandLineFileOptions } from './command-line-options-collectors/commandline-files-options.collector';
import { collectConfigFileFileOptions } from './config-file-options-collector/config-file-files-options.collector';

export const getFilesConversionOptions = async (): Promise<FileConversionOptions | Array<FileConversionOptions>> => {
  const configOptions = await collectConfigFileFileOptions();

  if (configOptions) {
    return configOptions;
  }
  Logger.verboseInfo(
    'No configuration found in package.json nor rc file - checking for arguments and applying defaults (see --help)'
  );
  return collectCommandLineFileOptions();
};
