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
  svgoConfig: any;
  outputDirectory: string;
  optimizeForLazyLoading: string;
}

export interface SingleFileConvertionOptions extends ConvertionOptions {
  fileName: string;
}

export interface MultiFileConvertionOptions extends ConvertionOptions {
  modelFileName: string;
  additionalModelOutputPath: string | null;
  iconsFolderName: string;
  compileSources: boolean;
}

export const getOptions = async (): Promise<MultiFileConvertionOptions | SingleFileConvertionOptions> => {
  const configOptions = await collectConfigurationOptions();

  if (configOptions) {
    return configOptions;
  }
  info(
    'No configuration found in package.json nor rc file - checking for arguments and applying defaults (see --help)'
  );
  return await collectArgumentOptions();
};
