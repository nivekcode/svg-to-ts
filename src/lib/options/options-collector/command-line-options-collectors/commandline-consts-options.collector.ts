import commander from 'commander';

import { getSvgoConfig } from '../../../helpers/svg-optimization';
import { ConstantsConversionOptions } from '../../conversion-options';
import { DEFAULT_OPTIONS } from '../../default-options';

import { toBoolean } from './command-line-collector.helpers';

export const collectCommandLineConstantOptions = async (): Promise<ConstantsConversionOptions> => {
  let {
    conversionType,
    delimiter,
    fileName,
    interfaceName,
    enumName,
    outputDirectory,
    prefix,
    typeName,
    generateType,
    generateTypeObject,
    generateEnum,
    verbose
  } = commander;
  let svgoConfig = commander.svgoConfig;
  generateType = toBoolean(generateType, DEFAULT_OPTIONS.generateType);
  generateTypeObject = toBoolean(generateTypeObject, DEFAULT_OPTIONS.generateTypeObject);
  generateEnum = toBoolean(generateEnum, DEFAULT_OPTIONS.generateTypeObject);
  verbose = toBoolean(verbose, DEFAULT_OPTIONS.verbose);

  // Because of commander adding default value to params
  // See: https://stackoverflow.com/questions/30238654/commander-js-collect-multiple-options-always-include-default
  let srcFiles = commander.srcFiles;
  if (srcFiles.length === 0) {
    srcFiles = DEFAULT_OPTIONS.srcFiles;
  }
  svgoConfig = await getSvgoConfig(svgoConfig);

  return {
    conversionType,
    delimiter,
    fileName,
    enumName,
    interfaceName,
    srcFiles,
    outputDirectory,
    prefix,
    typeName,
    generateType,
    generateTypeObject,
    generateEnum,
    svgoConfig,
    verbose
  };
};
