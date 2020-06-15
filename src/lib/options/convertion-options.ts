import { collectConfigurationOptions } from './config-collector';
import { collectArgumentOptions } from './args-collector';

import { info } from '../helpers/log-helper';
import { Delimiter } from '../generators/code-snippet-generators';

export enum ConvertionType {
  OBJECT = 'object',
  CONSTANTS = 'constants',
  FILES = 'files'
}

export interface CommonConvertionOptions {
  srcFiles: string[];
  outputDirectory: string;
  svgoConfig: any;
  delimiter: Delimiter;
}

export interface ObjectConvertionOptions extends CommonConvertionOptions {
  convertionType: ConvertionType.OBJECT;
  fileName: string;
  objectName: string;
}

export interface ConstantsConvertionOptions extends CommonConvertionOptions {
  convertionType: ConvertionType.CONSTANTS;
  fileName: string;
  typeName: string;
  generateType: boolean;
  generateTypeObject: boolean;
  prefix: string;
  interfaceName: string;
}

export interface FileConvertionOptions extends CommonConvertionOptions {
  convertionType: ConvertionType.FILES;
  typeName: string;
  generateType: boolean;
  generateTypeObject: boolean;
  prefix: string;
  interfaceName: string;
  optimizeForLazyLoading: string;
  modelFileName: string;
  additionalModelOutputPath: string | null;
  iconsFolderName: string;
  compileSources: boolean;
}

export const getOptions = async (): Promise<
  FileConvertionOptions | ConstantsConvertionOptions | ObjectConvertionOptions
> => {
  const configOptions = await collectConfigurationOptions();

  if (configOptions) {
    return configOptions;
  }
  info(
    'No configuration found in package.json nor rc file - checking for arguments and applying defaults (see --help)'
  );
  return collectArgumentOptions();
};
