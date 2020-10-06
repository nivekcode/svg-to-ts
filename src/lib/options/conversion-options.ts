import { collectConfigurationOptions } from './config-collector';
import { collectCommandLineOptions } from './command-line-collector';

import { info } from '../helpers/log-helper';
import { Delimiter } from '../generators/code-snippet-generators';

export enum ConversionType {
  OBJECT = 'object',
  CONSTANTS = 'constants',
  FILES = 'files'
}

export interface CommonConversionOptions {
  srcFiles: string[];
  outputDirectory: string;
  svgoConfig: any;
  delimiter: Delimiter;
}

export interface ObjectConversionOptions extends CommonConversionOptions {
  conversionType: ConversionType.OBJECT;
  fileName: string;
  objectName: string;
}

export interface ConstantsConversionOptions extends CommonConversionOptions {
  conversionType: ConversionType.CONSTANTS;
  fileName: string;
  typeName: string;
  generateType: boolean;
  generateTypeObject: boolean;
  generateCompleteIconSet?: boolean;
  prefix: string;
  interfaceName: string;
}

export interface FileConversionOptions extends CommonConversionOptions {
  conversionType: ConversionType.FILES;
  typeName: string;
  generateType: boolean;
  generateTypeObject: boolean;
  exportCompleteIconSet?: boolean;
  prefix: string;
  interfaceName: string;
  modelFileName: string;
  additionalModelOutputPath: string | null;
  iconsFolderName: string;
  compileSources: boolean;
  barrelFileName: string;
}

export const getOptions = async (): Promise<
  | FileConversionOptions
  | ConstantsConversionOptions
  | ObjectConversionOptions
  | Array<ConstantsConversionOptions | FileConversionOptions | ObjectConversionOptions>
> => {
  const configOptions = await collectConfigurationOptions();

  if (configOptions) {
    return configOptions;
  }
  info(
    'No configuration found in package.json nor rc file - checking for arguments and applying defaults (see --help)'
  );
  return collectCommandLineOptions();
};
