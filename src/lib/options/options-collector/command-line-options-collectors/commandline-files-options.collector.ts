import commander from 'commander';

import { getSvgoConfig } from '../../../helpers/svg-optimization';
import { FileConversionOptions } from '../../conversion-options';
import { DEFAULT_OPTIONS } from '../../default-options';

import { toBoolean } from './command-line-collector.helpers';

export const collectCommandLineFileOptions = async (): Promise<FileConversionOptions> => {
  let {
    conversionType,
    delimiter,
    barrelFileName,
    interfaceName,
    enumName,
    outputDirectory,
    prefix,
    typeName,
    generateType,
    generateTypeObject,
    generateEnum,
    modelFileName,
    iconsFolderName,
    additionalModelOutputPath,
    exportCompleteIconSet,
    compileSources,
    verbose
  } = commander;
  let svgoConfig = commander.svgoConfig;

  // Parse boolean values
  generateType = toBoolean(generateType, DEFAULT_OPTIONS.generateType);
  generateTypeObject = toBoolean(generateTypeObject, DEFAULT_OPTIONS.generateTypeObject);
  exportCompleteIconSet = toBoolean(exportCompleteIconSet, DEFAULT_OPTIONS.exportCompleteIconSet);
  compileSources = toBoolean(compileSources, DEFAULT_OPTIONS.compileSources);
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
    interfaceName,
    srcFiles,
    outputDirectory,
    prefix,
    typeName,
    enumName,
    generateType,
    generateTypeObject,
    generateEnum,
    modelFileName,
    iconsFolderName,
    exportCompleteIconSet,
    svgoConfig,
    additionalModelOutputPath,
    compileSources,
    barrelFileName,
    verbose
  };
};
