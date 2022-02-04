import commander from 'commander';

import { getSvgoConfig } from '../../../helpers/svg-optimization';
import { ConstantsConversionOptions } from '../../conversion-options/constant-conversion-options';
import { DEFAULT_CONST_CONVERSION_OPTIONS } from '../../default-options/default-constants-conversion-options';

import { toBoolean } from './command-line-collector.helpers';

export const collectCommandLineConstantOptions = async (): Promise<ConstantsConversionOptions> => {
  let {
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
    exportCompleteIconSet,
    completeIconSetName,
    verbose
  } = commander;
  let svgoConfig = commander.svgoConfig;
  generateType = toBoolean(generateType, DEFAULT_CONST_CONVERSION_OPTIONS.generateType);
  generateTypeObject = toBoolean(generateTypeObject, DEFAULT_CONST_CONVERSION_OPTIONS.generateTypeObject);
  generateEnum = toBoolean(generateEnum, DEFAULT_CONST_CONVERSION_OPTIONS.generateTypeObject);
  verbose = toBoolean(verbose, DEFAULT_CONST_CONVERSION_OPTIONS.verbose);
  exportCompleteIconSet = toBoolean(exportCompleteIconSet, DEFAULT_CONST_CONVERSION_OPTIONS.exportCompleteIconSet);

  // Because of commander adding default value to params
  // See: https://stackoverflow.com/questions/30238654/commander-js-collect-multiple-options-always-include-default
  let srcFiles = commander.srcFiles;
  if (srcFiles.length === 0) {
    srcFiles = DEFAULT_CONST_CONVERSION_OPTIONS.srcFiles;
  }
  svgoConfig = await getSvgoConfig(svgoConfig);

  return {
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
    exportCompleteIconSet,
    completeIconSetName,
    svgoConfig,
    verbose
  };
};
