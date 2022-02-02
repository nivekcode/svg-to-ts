import { Logger } from '../../helpers/logger';
import { ConstantsConversionOptions } from '../conversion-options/constant-conversion-options';

import { collectCommandLineConstantOptions } from './command-line-options-collectors/commandline-consts-options.collector';
import { collectConfigFileConstantOptions } from './config-file-options-collector/config-file-constants-options.collector';

export const getConstantConversionOptions = async (): Promise<
  ConstantsConversionOptions | Array<ConstantsConversionOptions>
> => {
  const configOptions = await collectConfigFileConstantOptions();

  if (configOptions) {
    return configOptions;
  }
  Logger.verboseInfo(
    'No configuration found in package.json nor rc file - checking for arguments and applying defaults (see --help)'
  );
  return collectCommandLineConstantOptions();
};
