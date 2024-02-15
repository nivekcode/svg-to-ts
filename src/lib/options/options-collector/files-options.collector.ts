import { Logger } from '../../helpers/logger';
import { FilesConversionOptions } from '../conversion-options/files-conversion-options';

import { collectCommandLineFileOptions } from './command-line-options-collectors/commandline-files-options.collector';
import { collectConfigFileFileOptions } from './config-file-options-collector/config-file-files-options.collector';

export const getFilesConversionOptions = async (): Promise<FilesConversionOptions | Array<FilesConversionOptions>> => {
  const configOptions = await collectConfigFileFileOptions();

  if (configOptions) {
    return configOptions;
  }
  Logger.verboseInfo(
    'No configuration found in package.json nor rc file - checking for arguments and applying defaults (see --help)',
  );
  return collectCommandLineFileOptions();
};
