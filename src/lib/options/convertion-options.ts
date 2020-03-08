import { Delimiter } from '../generators/code-snippet-generators';
import { collectConfigurationOptions } from './config-collector';
import { collectArgumentOptions } from './args-collector';
import { info } from '../helpers/log-helper';

export interface ConvertionOptions {
  delimiter: Delimiter;
  typeName: string;
  prefix: string;
  interfaceName: string;
  srcFiles: string[];
  outputDirectory: string;
  optimizeForLazyLoading: string;
}

export interface SingleFileConvertionOptions extends ConvertionOptions {
  fileName: string;
}

export interface MultiFileConvertionOptions extends ConvertionOptions {
  modelFileName: string;
  modelOutputPath: string;
  iconsFolderName: string;
}

export const getOptions = (): MultiFileConvertionOptions | SingleFileConvertionOptions => {
  const configOptions = collectConfigurationOptions();

  if (configOptions) {
    return configOptions;
  }
  info(
    'No configuration found in package.json nor rc file - checking for arguments and applying defaults (see --help)'
  );
  return collectArgumentOptions();
};
