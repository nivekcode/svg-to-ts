import { Delimiter } from '../generators/code-snippet-generators';
import { collectConfigurationOptions } from './config-collector';
import { collectArgumentOptions } from './args-collector';
import { info } from '../helpers/log-helper';

export enum ConvertionType {
  OBJECT = 'object',
  SINGLE_FILE = 'single-file',
  MULTIPLE_FILES = 'multiple-files'
}

export interface CommonConvertionOptions {
  srcFiles: string[];
  outputDirectory: string;
  svgoConfig: any;
  delimiter: Delimiter;
}

export interface CommonFileConvertionOptions extends CommonConvertionOptions {
  typeName: string;
  generateType: boolean;
  generateTypeObject: boolean;
  prefix: string;
  interfaceName: string;
  optimizeForLazyLoading: string;
}

export interface ObjectConvertionOptions extends CommonConvertionOptions {
  convertionType: ConvertionType.OBJECT;
  fileName: string;
  objectName: string;
}

export interface SingleFileConvertionOptions extends CommonFileConvertionOptions {
  convertionType: ConvertionType.SINGLE_FILE;
  fileName: string;
}

export interface MultiFileConvertionOptions extends CommonFileConvertionOptions {
  convertionType: ConvertionType.MULTIPLE_FILES;
  modelFileName: string;
  additionalModelOutputPath: string | null;
  iconsFolderName: string;
  compileSources: boolean;
}

export const getOptions = async (): Promise<
  MultiFileConvertionOptions | SingleFileConvertionOptions | ObjectConvertionOptions
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
