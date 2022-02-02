import { Logger } from '../../helpers/logger';
import { ObjectConversionOptions } from '../conversion-options/object-conversion-options';

import { collectCommandLineObjectOptions } from './command-line-options-collectors/commandline-object-options.collector';
import { collectConfigFileObjectOptions } from './config-file-options-collector/config-file-object-options.collector';

export const getObjectConversionOptions = async (): Promise<
  ObjectConversionOptions | Array<ObjectConversionOptions>
> => {
  const configOptions = await collectConfigFileObjectOptions();

  if (configOptions) {
    return configOptions;
  }
  Logger.verboseInfo(
    'No configuration found in package.json nor rc file - checking for arguments and applying defaults (see --help)'
  );
  return collectCommandLineObjectOptions();
};
